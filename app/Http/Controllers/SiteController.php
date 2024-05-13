<?php

namespace App\Http\Controllers;

use App\Models\Page;

class SiteController extends Controller
{
    public function index(string $url = '/')
    {
        if (cache()->has('page_' . app()->getLocale() . '-' . $url)) {
            $page = cache('page_' . app()->getLocale() . '-' . $url);
        } else {
            $page = Page::where('url', $url)->first();
            //cache(['page_' . app()->getLocale() . '-' . $url => $page]);
        }
        if (!$page) abort(404);
        $title = $page->title;
        if (!$title && app()->getLocale() == 'ru') $title = $page->translate('en')->title;
        elseif (!$title) $title = $page->translate('ru')->title;

        $description = $page->description;
        if (!$description && app()->getLocale() == 'ru' && $page->translate('en')) $description = $page->translate('en')->description;
        elseif (!$description) $description = $page->translate('ru')->description;

        $content = $page->text;
        if (!$content && app()->getLocale() == 'ru') $content = $page->translate('en')->text;
        elseif (!$content) $content = $page->translate('ru')->text;

        $breadcrumbs = [];
        if ($page->parent_id) {
            $parent_id = $page->parent_id;
            $i = 100;
            while ($parent_id) {
                $pageParent = Page::where('id', $parent_id)->first();
                if (!$pageParent) break;
                $parent_id = $pageParent->parent_id;

                $_title = $pageParent->title;
                if (is_null($_title) && app()->getLocale() == 'ru') $_title = $pageParent->translate('en')->title;
                elseif (is_null($_title)) $_title = $pageParent->translate('ru')->title;

                $breadcrumbs[$i] = [
                    'title' => $_title,
                    'link' => '/' . $pageParent->url
                ];
                $i--;
            }
        }
        if ($url != '/') {
            $breadcrumbs[] = [
                'title' => $title,
                'link' => '/' . $page->url
            ];
        }
        ksort($breadcrumbs);

        $siteBar = [];
        if ($page->siteBar) {
            if ($page->parent_id && !$page->isFolder)
                $siteBar = Page::where('parent_id', $page->parent_id)->orderBy('position')->get();
            else {
                $siteBar = Page::where('parent_id', $page->id)->orWhere('id', $page->id)->orderBy('position')->get();
            }

        }

        /*preg_match_all('/<a\s*?[^>]*?href\s*?=(["\'])(.+?)\1[^>]*?>/ui', $content, $links);*/
        //\App\BrokenLinks::listLink();

        $data = view('page', [
            'title' => $url != '/' ? $title: '',
            'description' => $description,
            'breadcrumbs' => $breadcrumbs,
            'content' => $content,
            'isTranslate' => $page->text ? true: false,
            'sitebar' => $page->siteBar,
            'cardBody' => $page->cardBody,
            'isContainer' => $page->isContainer,
            'siteBarMenu' => $siteBar,
            'url' => $url
        ])->withShortcodes();

        if (config('app.debug') === true) {
            $data .= "<!--\n";
            foreach (\App\Providers\AppServiceProvider::$query as $key => $query) {
                $data .= '===== ' . $key . " =====\n";
                for ($i = 1; $i <= count($query); $i++) {
                    $j = $i - 1;
                    $data .= $i . '. ' . $query[$j]['sql'] . '(';
                    $data .= implode(',', $query[$j]['bindings']);
                    $data .= ') - ' . $query[$j]['time'] . "\n";
                }
            }
            $data .= "-->";
        }

        return $data;
    }
}
