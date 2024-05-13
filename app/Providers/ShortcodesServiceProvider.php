<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Shortcode;

class ShortcodesServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Shortcode::register('view', function($shortcode, $content, $compiler, $name, $viewData){
            if (resource_path('/views/shortcode/' . $shortcode->include . '.blade.php'))
                return view('shortcode.' . $shortcode->include);
            return '['. $name . ']';
        });
        Shortcode::register('page-sveden', function(){
            return view('shortcode.sveden');
        });
        Shortcode::register('page-sveden-common', function(){
            return view('shortcode.sveden-common');
        });
        Shortcode::register('page-sveden-law-map', function(){
            $map = [
                [
                    'name' => __('Basic information'),
                    'url' => config('app.url') . '/sveden/common'
                ],
                [
                    'name' => __('The structure and management bodies of an educational organization'),
                    'url' => config('app.url') . '/sveden/struct'
                ],
                [
                    'name' => __('Documents'),
                    'url' => config('app.url') . '/sveden/document'
                ],
                [
                    'name' => __('Education'),
                    'url' => config('app.url') . '/sveden/education'
                ],
                [
                    'name' => __('Educational standards'),
                    'url' => config('app.url') . '/sveden/eduStandarts'
                ],
                [
                    'name' => __('Guide'),
                    'url' => config('app.url') . '/sveden/guide'
                ],
                [
                    'name' => __('Teaching staff'),
                    'url' => config('app.url') . '/sveden/employees'
                ],
                [
                    'name' => __('Material and technical support and equipment of the educational process'),
                    'url' => config('app.url') . '/sveden/objects'
                ],
                [
                    'name' => __('Scholarships and student support measures'),
                    'url' => config('app.url') . '/sveden/grants'
                ],
                [
                    'name' => __('Paid educational services'),
                    'url' => config('app.url') . '/sveden/paid_edu'
                ],
                [
                    'name' => __('Financial and economic activities'),
                    'url' => config('app.url') . '/sveden/budget'
                ],
                [
                    'name' => __('Vacant places for admission (transfer) of students'),
                    'url' => config('app.url') . '/sveden/vacant'
                ],
                [
                    'name' => __('Available environment'),
                    'url' => config('app.url') . '/sveden/ovz'
                ],
                [
                    'name' => __('International cooperation'),
                    'url' => config('app.url') . '/sveden/inter'
                ],
                [
                    'name' => __('Catering in an educational organization'),
                    'url' => config('app.url') . '/sveden/nutrition'
                ],
                [
                    'name' => __('Applicant'),
                    'url' => config('app.url') . '/abitur'
                ]
            ];
            return view('shortcode.sveden-law-map', compact('map'));
        });
    }
}
