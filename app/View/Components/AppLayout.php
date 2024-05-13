<?php

namespace App\View\Components;

use App\Models\Menu;
use Illuminate\View\Component;
use JetBrains\PhpStorm\NoReturn;

class AppLayout extends Component
{
    public string $layout = 'main';
    public ?string $description = '';
    public string $title = '';
    public array $breadcrumbs = [];
    public bool $isTranslate = true;

    private int $_id = 0;
    private int $_level = 0;
    private array $_menu = [];

    public function __construct(
        string $layout = 'main',
        string $title = '',
        ?string $description = '',
        array $breadcrumbs = [],
        bool $isTranslate = true,
    ) {
        $this->layout = $layout;
        $this->title = $title;
        $this->description = $description;
        $this->breadcrumbs = $breadcrumbs;
        $this->isTranslate = $isTranslate;
    }

    /**
     * Get the view / contents that represents the component.
     */
    #[NoReturn] public function render(): \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Foundation\Application
    {
        if (cache()->has('menuTop_' . app()->getLocale())) {
            $menuTop = cache('menuTop_' . app()->getLocale());
        } else {
            $this->_id = 0;
            $this->_level = 0;
            $this->_menu = [];
            $menuTop = $this->getTree(Menu::where('menu_id', 'top')->orderBy('position')->get()->toArray());
            cache(['menuTop_' . app()->getLocale() => $menuTop]);
        }

        if (cache()->has('menuBasic_' . app()->getLocale())) {
            $menuBasic = cache('menuBasic_' . app()->getLocale());
        } else {
            $this->_id = 0;
            $this->_level = 0;
            $this->_menu = [];
            $menuBasic = $this->getTree(Menu::where('menu_id', 'basic')->orderBy('position')->get()->toArray());
            cache(['menuBasic_' . app()->getLocale() => $menuBasic]);
        }

        if (cache()->has('menuFooter_' . app()->getLocale())) {
            $menuFooter = cache('menuFooter_' . app()->getLocale());
        } else {
            $this->_id = 0;
            $this->_level = 0;
            $this->_menu = [];
            $menuFooter = $this->getTree(Menu::where([
                'menu_id' => 'footer',
                'parent_id' => null
            ])->orderBy('position')->get()->toArray());
            cache(['menuFooter_' . app()->getLocale() => $menuFooter]);
        }

        //dd($menuBasic);

        return view('layouts.' . $this->layout, compact('menuTop', 'menuBasic', 'menuFooter'));
    }

    private function getTree($data) {
        $dataset = [];
        foreach ($data as $value) {
            $default = '';
            $value['title'] = '';
            foreach ($value['translations'] as $translation) {
                if (!$default || $translation['locale'] == 'en') $default = $translation['title'];
                elseif (app()->getLocale() == $translation['locale']) $value['title'] = $translation['title'];
            }
            if (!$value['title']) $value['title'] = $default;
            unset($value['translations']);
            $dataset[$value['id']] = $value;
        }

        $tree = array();
        foreach ($dataset as $id => &$node) {
            //Если нет вложений
            if (!$node['parent_id']){
                $tree[$id] = &$node;
            }else{
                //Если есть потомки то перебераем массив
                $dataset[$node['parent_id']]['childs'][$id] = &$node;
            }
        }
        return $this->showCat($tree);
    }
    private function showCat($data){
        foreach($data as $item){
            $this->tplMenu($item);
        }
        return $this->_menu;
    }

    private function tplMenu($category){
        $this->_id++;
        $data = $category;
        unset($data['childs']);

        if (mb_substr($data['url'], 0, 1) == '/') {
            $data['url'] = config('app.url') . $data['url'];
            //if (app()->getLocale() != 'en') {
                //$data['url'] = '/' . app()->getLocale() . $data['url'];
            //}
        }
        if (app()->getLocale() != 'en') $data['url'] = str_replace('{lang}', '/' . app()->getLocale(), $data['url']);
        else $data['url'] = str_replace('{lang}', '', $data['url']);

        $data['level'] = $this->_level;
        $this->_menu[$this->_id] = $data;
        $this->_menu[$this->_id]['childs'] = false;

        if(isset($category['childs'])){
            $this->_level++;
            $this->_menu[$this->_id]['childs'] = true;
            $this->showCat($category['childs']);
            $this->_level--;
        }
    }
}
