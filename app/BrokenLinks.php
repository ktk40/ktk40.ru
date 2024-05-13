<?php

namespace App;

use App\Models\Menu;
use App\Models\Page;
use stdClass;

class BrokenLinks
{
    public static stdClass $linlks;

    private static function isValidUri($uri)
    {

        // получаем заголовки ответа сервера
        // знак @ - перед вызовом функции - это оператор подавления ошибок в php
        // в случае ошибки просто возвращаем false
        $hds = @get_headers($uri);

        // проверка, если нет заголовков, т.е. такого сайта нет например
        // или сервер вернул код 404
        return !$hds || (strpos($hds[0], ' 404 ') !== false ) ? false : true;
    }

    public static function listLink()
    {
        self::$linlks = new stdClass();
        self::$linlks->menu = [];
        self::$linlks->page = [];

        Menu::chunk(10, function($menu){
            foreach ($menu as $value) {
                if (mb_substr($value->url, 0, 1) == '/') {
                    $page = Page::where('url', mb_substr($value->url, 1))->first();
                    if (!$page) self::$linlks->menu[] = [
                        'id' => $value->id,
                        'url' => $value->url,
                    ];
                    unset($page);
                } elseif (!self::isValidUri($value->url)) {
                    self::$linlks->menu[] = [
                        'id' => $value->id,
                        'url' => $value->url,
                    ];
                }
            }
        });

        Page::chunk(10, function($pages){
            $home_url = config('app.url');
            $locales = config('translatable.locales');
            foreach ($pages as $value) {
                foreach ($locales as $locale) {
                    $content = '';
                    $data = $value->translate($locale);
                    if (!is_null($data)) $content = \Shortcode::compile($data->text);
                    if ($content) {
                        $links = [];
                        preg_match_all('/<a\s*?[^>]*?href\s*?=(["\'])(.+?)\1[^>]*?>/ui', $content, $matches);
                        if (isset($matches[2])) {
                            foreach ($matches[2] as $lnk) {
                                $links[] = str_replace($home_url, '', $lnk);
                            }
                        }
                        foreach ($links as $link) {
                            $status = false;
                            if (mb_substr($link, 0, 1) == '/') {
                                $page = Page::where('url', mb_substr($link, 1))->first();
                                if (!$page) $status = true;
                            }
                            if ($status) self::$linlks->page[$locale][] = [
                                'page_id' => $value->id,
                                'broken_link' => $link,
                            ];
                        }
                    }
                }
            }
        });
        dd(self::$linlks);
    }
}
