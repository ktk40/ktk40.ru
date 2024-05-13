<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function __construct()
    {

        $_SERVER['URI_LANG']  = '';
        if (config('app.fallback_locale') != config('app.locale')) {
            app('config')->set('app.url', config('app.url') . '/' . config('app.locale'));
        }
    }
}
