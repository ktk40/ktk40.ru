<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="description" content="{{ !empty($description) ? $description: __('default_description') }}"/>

    <title>{{ !empty($title) ? __('information.name_organisation') . ' | ' . $title: __('information.name_organisation') }}</title>

    <noscript><meta http-equiv="refresh" content="0; URL={{ app()->getLocale() != 'en' ? '/' . app()->getLocale(): '' }}/badbrowser"/></noscript>

    @vite(['resources/css/app.scss'])

    <script>var RS={lang:'{{ str_replace('_', '-', app()->getLocale()) }}'},MESSAGES={{ Illuminate\Support\Js::from(
    app('translator')->get('js')
) }};function getMessage(key){return MESSAGES[key]}</script>
</head>
<body class="theme-light">
<div class="ktk-pagewrap-area overflow-hidden d-flex">
    <header class="header-area d-print-none theme-inherit bg-theme-0 mb-0 ktk-grid-area">
        <div class="container-wrap bg-theme-1 bb-1 b-theme-3">
            <div class="container">
                <div class="row d-flex -align-items-center">
                    {{--------------- MENU TOP ---------------}}
                    <div class="col-12 col-lg-10">
                        <div id="ktk-fixed-id-ktk" class="navigation-container ktk-nav-fixed-ktk no-fixed ktk-nav-fixed vertical-submenu h-100">
                            <div class="container-wrap">
                                <div class="w-100 h-100 nav-container">
                                    <nav id="ktk-nav-ktk" class="ktk-nav w-100 h-100 m-0 p-0 d-flex align-items-streach justify-content-between flex-row flex-wrap"><section class="left-section d-flex align-items-streach justify-content-between flex-row flex-wrap"></section><section class="center-section align-items-streach mobile-level ktk-scroll justify-content-start mobile-theme-light mobile-view-ktk"><button class="mobile-close ktk-close" style="display:none"></button>
                                            <h3 class="mobile-header m-0" style="display: none">{{ __('Menu') }}</h3>
                                            <ul class="nav-items d-inline-flex align-items-streach justify-content-start p-0 m-0 flex-wrap">
                                                @php
                                                    $level = 0;
                                                @endphp
                                                @for($i = 1; $i <= count($menuTop); $i++)
                                                    @php
                                                        $new = ['level' => 0];
                                                        if (isset($menuTop[$i + 1])) $new = $menuTop[$i + 1];
                                                    @endphp
                                                    <!--- {{ $level }} - {{ $menuTop[$i]['level'] }} -->
                                                    <li class="nav-item">
                                                        <a class="p-2 t--1 allotment item-link" href="{{ $menuTop[$i]['url'] }}">
                                                            <span class="item-text">{{ $menuTop[$i]['title'] }}</span>
                                                            @if($menuTop[$i]['childs'])
                                                                <span class="item-icon submenu-indicator nav-next-level submenu-indicator-minus">
                                                                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                                                                </span>
                                                                <span class="item-hover" style="display:none"></span>
                                                            @endif
                                                        </a>
                                                        @if($menuTop[$i]['childs'])
                                                            @php
                                                                $level++;
                                                            @endphp
                                                            <div class="nav-submenu mobile-level ktk-scroll align-items-start justify-content-center theme-light child-color-submenu-ktk fixed-theme-light-submenu fixed-submenu-color-ktk mobile-theme-light mobile-view-ktk" style="z-index:100">
                                                                <div class="content-mobile-horizontal" style="display:none">
                                                                    <h3 class="mobile-header m-0" style="display:none">{{ $menuTop[$i]['title'] }}</h3>
                                                                    <a class="nav-back w-100 align-items-center justify-content-start pt-3 pb-3" href="#">
                                                                        <span class="back-icon mr-2">
                                                                            <i class="fa-solid fa-left-long"></i>
                                                                        </span>
                                                                        <span class="item-text">{{ __('Back') }}</span>
                                                                    </a>
                                                                </div>
                                                                <ul class="nav-items submenu-items p-0 container w-100">
                                                        @elseif($level != $new['level'] && count($menuTop) != $i)
                                                                    @php
                                                                        echo '</li>';
                                                                    @endphp
                                                                </ul>
                                                            </div>
                                                            @php
                                                                echo '</li>';
                                                            @endphp
                                                        @else
                                                    </li>
                                                       @endif
                                                    @if(!$menuTop[$i]['childs'])
                                                        @php
                                                            $level = $new['level'];
                                                        @endphp
                                                    @endif
                                                @endfor
                                            </ul>
                                        </section><section class="right-section d-inline-flex align-items-streach justify-content-end flex-row flex-wrap"><button class="btn-mobile b-0 p-2 t--1"><i class="fa-solid fa-bars" aria-hidden="true"></i></button></section>
                                        <div class="nav-overlay"></div>
                                        <div class="nav-overlay"></div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    {{-------------- MENU TOP ---------------}}
                    <div class="col-12 col-lg-2 d-flex justify-content-end align-items-center">
                        <div class="t--1">
                            <div class="ktk-translate language notranslate ktk-form-select">
                                <label for="ktk-translate__list" class="selected-lang">
                                    <div class="saving"><span>.</span><span>.</span><span>.</span></div>
                                </label>
                                <select class="ktk-form-control ktk-form-control-sm " id="ktk-translate__list">
                                    <option value="ru">Russian</option>
                                    <option value="en" @if(app()->getLocale() == 'en')selected @endif>English</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-wrap py-4">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-lg-5 mb-3 mb-lg-0">
                        <div class="d-flex align-items-center">
                            <a href="{{ config('app.url') . $_SERVER['URI_LANG'] }}">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 595.75 216.05" style="width: 200px"><linearGradient id="gradient-logo-t" x2="1" y2="0.87"><stop offset="80%" stop-color="#2400c2" /><stop offset="95%" stop-color="#400095" /></linearGradient><linearGradient id="gradient-logo-k2" x2="1" y2="0.87"><stop offset="5%" stop-color="#3e0098" /><stop offset="95%" stop-color="#4d007f" /></linearGradient><path class="logo-ktk-t" d="M395.66,10.38V225.86h-5.57q-80.49,0-161,0a9.25,9.25,0,0,1-8-3.67q-41.43-50.06-83.16-99.86c-3-3.62-2.77-5.62.14-9.07,27.78-33,55.33-66.24,83.07-99.29,1.51-1.79,4.19-3.67,6.33-3.68,55.15-.21,110.31-.17,165.47-.17C393.74,10.17,394.54,10.29,395.66,10.38ZM272,72.75v6.92q0,57.71,0,115.42c0,7.24.63,8.55,8,9.17a146,146,0,0,0,23.84,0c7.39-.6,8-1.91,8-9.16q0-57.72,0-115.42V72.57h53.83V35.25a29.36,29.36,0,0,0-3.13-.34q-57,0-113.92,0a6.27,6.27,0,0,0-4.08,1.22c-8.59,8.59-17.27,17.13-25.32,26.22-1.66,1.87-1.23,6-.91,8.94.07.67,3.64,1.36,5.62,1.39,9.49.14,19,0,28.48,0Z"  transform="translate(-2.12 -10.06)"/><path class="logo-ktk-k1" d="M103.59,109.34c3,4,5.94,7.77,8.88,11.57q31.64,40.92,63.22,81.86a71.32,71.32,0,0,1,7.49,12.32c2.21,4.6.85,7.64-4.06,8.66a101.15,101.15,0,0,1-43.57,0c-2.86-.65-5.71-3.39-7.59-5.9q-35.5-47.38-70.69-95c-1.08-1.47-2.2-2.91-4.31-5.69-.15,3.17-.3,5-.3,6.78,0,30.49-.08,61,.07,91.46,0,5-1.62,7.9-6.63,8.81A99.6,99.6,0,0,1,8.4,224c-4.39-.88-6.29-3.23-6.28-8q.18-98.22,0-196.43c0-4.52,1.78-6.85,6-7.66a105.81,105.81,0,0,1,38.22-.14c4.89.85,6.35,3.76,6.33,8.49-.14,27-.06,54-.06,81v7c2-2.22,3.16-3.41,4.19-4.7,22.23-27.66,44.57-55.22,66.54-83.08,4.69-6,9.91-9.77,17.49-9.73,10.31.06,20.66-.18,30.9.72,9,.79,10.77,5.39,5.78,13a95.48,95.48,0,0,1-8.14,10.73Q138.27,70.29,107,105.32C105.86,106.54,104.84,107.84,103.59,109.34Z"  transform="translate(-2.12 -10.06)"/><path class="logo-ktk-k2" d="M517.19,109.37l42,54.39c10.29,13.31,20.65,26.57,30.83,40a66.34,66.34,0,0,1,6.51,10.61c2.64,5.34,1.32,8.2-4.4,9.6a51.55,51.55,0,0,1-11.83,1.68c-8.81,0-17.63-.28-26.44-.68-5.46-.25-9.54-2.82-12.89-7.37q-35.26-47.9-70.86-95.53c-.93-1.26-2-2.43-3.77-4.6-.14,3.06-.28,4.81-.28,6.56,0,30.49-.13,61,.11,91.48,0,5.44-2,8.66-7.06,8.81q-18.12.53-36.27,0c-5-.15-7.2-3.29-7.18-8.74q.24-97.72,0-195.47c0-4.86,1.68-7.55,6.44-8.36a109.88,109.88,0,0,1,37.77,0c4.5.79,6.24,3.28,6.21,8-.17,27.16-.08,54.32-.08,81.48v7.06c2-2.21,3.14-3.39,4.17-4.67C492.5,75.93,515,48.45,536.82,20.5c5.28-6.74,11.34-10.1,19.43-10.1,9.48,0,19,0,28.43.88,9.91.9,12.1,5.65,6.06,13.6-7.44,9.79-15.61,19.05-23.74,28.3-15.29,17.39-30.79,34.61-46.19,51.9C519.61,106.43,518.48,107.84,517.19,109.37Z"  transform="translate(-2.12 -10.06)"/></svg>
                            </a>
                        </div>
                    </div>
                    <div class="col-12 col-lg-4 t--1 d-flex align-items-center mb-3 mb-lg-0">
                        <div class="ktk-info-contact">
                            <div class="ktk-info-block-contact">
                                <i class="fa fa-fw fa-map-marker-alt mr-2 c-primary" aria-hidden="true"></i>
                                <span class="c-text-primary">{{ __('information.address') }}</span>
                            </div>
                            <div class="ktk-info-block-contact">
                                <i class="fa fa-fw fa-phone mr-2 c-primary" aria-hidden="true"></i>
                                @foreach(config('information.phones') as $value)
                                    <a class="c-text-primary ktk-link ktk-link-theme ktk-link-dashed" href="tel:{{ $value }}">{{ $value }}</a>
                                @endforeach
                            </div>
                            <div class="ktk-info-block-contact">
                                <i class="fa fa-fw fa-envelope mr-2 c-primary" aria-hidden="true"></i>
                                @foreach(config('information.emails') as $value)
                                    <a class="c-text-primary ktk-link ktk-link-theme ktk-link-dashed" href="mailto:{{ $value }}">{{ $value }}</a>
                                @endforeach
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-3 t--1 d-flex align-items-center justify-content-xl-end">
                        <div class="header-block-container">
                            <div id="specialButton" class="c-text-primary ktk-link ktk-link-theme ktk-link-dashed text-center" itemprop="copy" style="cursor: pointer">
                                <i class="fa fa-fw fa-eye mr-2 c-primary" aria-hidden="true" style="font-size: 42px;"></i>
                                <br />
                                <span>{{ __('app.visually_impaired') }}</span>
                            </div>
                            {{--<div class=" ">

                                <ul class="t-list pl-0 m-0">
                                    <li class="d-inline-block">

                                        <i class="fa fa-fw fa-sign-in mr-2 c-primary" aria-hidden="true"></i>
                                        <a class="c-text-primary ktk-link ktk-link-theme ktk-link-dashed" href="{{ url()->to('/') . $_SERVER['URI_LANG'] }}/auth/">{{ __('app.login') }}</a>
                                    </li>
                                </ul>
                            </div>--}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-wrap">
            <div class="w-100 nav-container">
                <div class="row">
                    <div class=" col-12">
                        {{------------------- BASIC MENU ------------------}}
                        <div id="ktk-fixed-id-8aryOB" class="navigation-container ktk-nav-fixed8aryOB no-fixed ktk-nav-fixed theme-dark horizontal-submenu">
                            <div class="container-wrap">
                                <div class="container nav-container">
                                    <nav id="ktk-nav-8aryOB" class="ktk-nav w-100 m-0 p-0 d-flex align-items-streach justify-content-between flex-row flex-wrap">
                                        <section class="center-section align-items-streach mobile-level ktk-scroll justify-content-start mobile-theme-dark mobile-view8aryOB">
                                            <button class="mobile-close ktk-close" style="display:none"></button>
                                            <h3 class="mobile-header m-0" style="display: none">{{ __('Menu') }}</h3>
                                            <ul class="nav-items d-inline-flex align-items-streach justify-content-start p-0 m-0 flex-wrap">
                                                @php
                                                    $level = 0;
                                                @endphp
                                                @for($i = 1; $i <= count($menuBasic); $i++)
                                                    @php
                                                        $new = ['level' => 0];
                                                        if (isset($menuBasic[$i + 1])) $new = $menuBasic[$i + 1];
                                                    @endphp
                                                        <!--- {{ $level }} - {{ $menuBasic[$i]['level'] }} -->
                                                    <li class="nav-item">
                                                        <a class="p-3 t-0 blackout item-link" href="{{ $menuBasic[$i]['url'] }}">
                                                            <span class="item-text">{{ $menuBasic[$i]['title'] }}</span>
                                                            @if($menuBasic[$i]['childs'])
                                                                <span class="item-icon submenu-indicator nav-next-level">
                                                                    <i class="fa-solid fa-angle-down" aria-hidden="true"></i>
                                                                </span>
                                                                <span class="item-hover" style="display:none"></span>
                                                            @endif
                                                        </a>
                                                        @if($menuBasic[$i]['childs'])
                                                            @php
                                                                $level++;
                                                            @endphp
                                                            <div class="nav-submenu mobile-level ktk-scroll align-items-start justify-content-center theme-light child-color-submenu-8aryOB mobile-theme-dark mobile-view8aryOB" style="z-index:100">
                                                                <div class="content-mobile-horizontal" style="display:none">
                                                                    <h3 class="mobile-header m-0" style="display:none">{{ $menuBasic[$i]['title'] }}</h3>
                                                                    <a class="nav-back w-100 align-items-center justify-content-start pt-3 pb-3" href="#">
                                                                            <span class="back-icon mr-2">
                                                                                <i class="fa-solid fa-left-long"></i>
                                                                            </span>
                                                                        <span class="item-text">{{ __('Back') }}</span>
                                                                    </a>
                                                                </div>
                                                                <ul class="nav-items submenu-items p-0 container w-100">
                                                                    @elseif($level != $new['level'] && count($menuBasic) != $i)
                                                                        @php
                                                                            echo '</li>';
                                                                        @endphp
                                                                </ul>
                                                            </div>
                                                            @php
                                                                echo '</li>';
                                                            @endphp
                                                        @else
                                                    </li>
                                                    @endif
                                                    @if(!$menuBasic[$i]['childs'])
                                                        @php
                                                            $level = $new['level'];
                                                        @endphp
                                                    @endif
                                                @endfor
                                            </ul>
                                        </section>
                                        <section class="right-section d-inline-flex align-items-streach justify-content-end flex-row flex-wrap">
                                            <button class="btn-mobile b-0 p-3 t-0">
                                                <i class="fa-solid fa-bars" aria-hidden="true"></i>
                                            </button>
                                            <div class="nav-search">
                                                <form action="{{ app()->getLocale() != 'en' ? '/' . app()->getLocale(): '' }}/search" class="search-form w-100 h-100 align-items-center justify-content-between m-0 mb-0" style="display: none;">
                                                    <div id="title-search" class="inner-search d-block w-100 h-100">
                                                        <div class="d-flex align-items-center justify-content-center h-100 w-100">
                                                            <input id="title-search-input" class="input-search d-block p-2 m-0" style="width:inherit" type="text" name="q" placeholder="{{ __('Search') }}" autocomplete="off">
                                                        </div>
                                                        <button class="ktk-close t-1 ktk-close-center"></button>
                                                        <div class="nav-live-search search-res"></div>
                                                        <div class="nav-live-search search-res"></div>
                                                    </div>
                                                </form>
                                                <div class="btn-search b-0 p-3 t-0">
                                                    <i class="fa-solid fa-magnifying-glass"
                                                       aria-hidden="true"></i>
                                                </div>
                                            </div>
                                        </section>
                                        <div class="nav-overlay"></div>
                                        <div class="nav-overlay"></div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        {{------------------- BASIC MENU ------------------}}
                    </div>
                </div>
            </div>
        </div>
        @if (isset($breadcrumbs) && $breadcrumbs)
            <div class="container-wrap l-inherit l-underline-none shadow-2">
                <div class="container">
                    <div class="row">
                        <div class="col-12 d-block col-sm-12 d-sm-block col-md-12 d-md-block col-lg-8 d-lg-block col-xl-8 d-xl-block py-3 align-self-center">
                            <ol class="t-list m-0 p-0" itemscope="" itemtype="http://schema.org/BreadcrumbList">
                                <li class="float-left"><a href="{{ config('app.url') }}"><i class="fa fa-home fa-fw"></i></a></li>
                                @foreach($breadcrumbs as $breadcrumb)
                                    <li class="float-left" itemprop="itemListElement" itemtype="http://schema.org/ListItem">
                                        <i class="fa-solid fa-angle-right mx-2" aria-hidden="true"></i>
                                        <a href="{{ config('app.url') . $breadcrumb['link'] }}" title="{{ $breadcrumb['title'] }}" itemprop="item">
                                            <span itemprop="name">{{ $breadcrumb['title'] }}</span>
                                        </a>
                                        {{-- <meta itemprop="position" content="0" /> --}}
                                    </li>
                                @endforeach
                            </ol>
                        </div>
                        <div class="d-none d-sm-none d-md-none col-lg-4 d-lg-block col-xl-4 d-xl-block py-3 align-self-center">
                            <section class="ktk-share theme-dark justify-content-end bg-transparent">
                                <div class="ktk-share-btn bg-print mr-1 mr-1 mb-0 circle" data-service="print" onclick="window.print()">
                                    <div class="ktk-share-icon p-1 t-0">
                                        <i class="fa fa-print fa-fw"></i>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        @endif
    </header>

    <main>
        @if (!$isTranslate)
            <div class="alert alert-warning alert-dismissible d-print-none" role="alert">
                <spna>{{ __('app.no_translate') }}</spna>
                <button type="button" class="btn-close"  data-dismiss="alert" aria-label="Close"></button>
            </div>
        @endif

        {{ $slot }}
    </main>

    <footer class="ktk-footer-area d-print-none mt-auto bg-theme-2">
        <div class="footer-menu-container" style="position:relative">
            <section class="ktk-grid-area">
                <div class="container-wrap">
                    <div class="container">
                        <div class="row py-4 bb-1 b-theme-5">
                            <div class=" col-12 col-lg-4 mb-3 mb-md-0">
                                <div class="footer-menu-container">
                                    <div class="footer-menu-container">
                                        <h3 class="t-0 t-uppercase t-bold mt-0 mb-3">{{ __('Contacts') }}</h3>
                                    </div>
                                    <div class="footer-menu-container">
                                        <i class="far fa-fw fa-map-marker-alt mr-2 c-icon-active" aria-hidden="true"></i>
                                        <span class="c-text-primary">{{ __('information.address') }}</span>
                                    </div>
                                    <div class="footer-menu-container">
                                        <i class="far fa-fw fa-phone mr-2 c-icon-active" aria-hidden="true"></i>
                                        <span>
                                            @foreach(config('information.phones') as $value)
	    	                                    <a class="c-text-primary ktk-link ktk-link-theme ktk-link-dashed" style="white-space:nowrap" href="tel:{{ $value }}">{{ $value }}</a>
                                            @endforeach
	                                    </span>
                                    </div>
                                    <div class="mb-3">
                                        <i class="far fa-fw fa-envelope mr-2 c-icon-active" aria-hidden="true"></i>
                                        @foreach(config('information.emails') as $value)
                                            <a class="c-text-primary ktk-link ktk-link-theme ktk-link-dashed" href="mailto:{{ $value }}">{{ $value }}</a>
                                        @endforeach
                                    </div>
                                    {{--<div class="mb-3">
                                        <!-- MODAL WINDOW -->
                                        <div class="modal-window-home" id="modal-window-home-id" params="close" onload="text" style="display: none;">
                                            <form method="POST" name="helpForm">
                                                <!-- CONTENT MODAL -->
                                                <div class="content-modal-window">
                                                    <!-- HEADER -->
                                                    <div class="header-modal-window">
                                                        <span class="header-modal-window-text">{{ __('An error has been found on the site') }}</span>
                                                        <div class="close-icon-button-block over-mask">
                                                            <div class="over-mask but-close-over-mask" params="close" onclick="closeModalWindow()"></div>
                                                            <svg width="18" height="18" viewBox="0 0 512 512">
                                                                <line x1="5" y1="5" x2="510" y2="510" stroke="#000000" stroke-width="20"></line>
                                                                <line x1="5" y1="510" x2="510" y2="5" stroke="#000000" stroke-width="20"></line>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <!-- CONTENT BLOCK -->
                                                    <div class="content-modal-window-message-submit">
                                                        <p>{{ __('The text with an error') }}</p>
                                                        <div id="mess" class="text-error"
                                                             style="color: rgba(0, 0, 0, 0.54);">{{ __('Did you find a mistake? Let us know!') }} {{ __('Highlight and press Ctr+Enter') }}</div>
                                                        <div id="elem-form">
                                                            <textarea class="form-sm-element message-text-submit" id="text-form" name="error_desc" placeholder="{{ __('The text with an error') }}" style="display: block;"></textarea>
                                                            <input type="hidden" name="error_message" value="{{ __('Did you find a mistake? Let us know!') }} {{ __('Highlight and press Ctr+Enter') }}">
                                                            <input type="hidden" name="error_url" value="{{ url()->full() }}">
                                                            <input type="hidden" name="error_referer" value="{{ url()->full() }}">
                                                            <input type="hidden" name="error_useragent" value="{{ request()->header('User-Agent') }}">
                                                        </div>
                                                    </div>
                                                    <!-- FOOTER -->
                                                    <div class="footer-modal-window">
                                                        <input type="submit" value="{{ __('Send') }}" id="send" class="but-sm but-sm-submit btn-button-modal-window m-20" wfd-id="id1" style="display: block;">
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <p>{{ __('Did you find a mistake? Let us know!') }}<br/>{{ __('Highlight and press Ctr+Enter') }}</p>
                                    </div>--}}
                                </div>
                            </div>
                            <div class="col-12 col-lg-4 mb-3 mb-md-0">
                                <div class="footer-menu-wrap">
                                    <div class="footer-menu-container">
                                        <h3 class="t-0 t-uppercase t-bold mt-0 mb-3">{{ __('Menu') }}</h3>
                                    </div>
                                    <div class="l-inherit ml-4">
                                        <ul class="fa-ul row">
                                            @foreach($menuFooter as $value)
                                                <li class="col-md-6 pl-0 pr-3">
                                                    <i class="fa-li far fa-solid fa-angle-right c-text-secondary" aria-hidden="true"></i>
                                                    <a href="{{ $value['url'] }}">{{ $value['title'] }}</a>
                                                </li>
                                            @endforeach
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class=" col-12 col-lg-4 mb-3 mb-md-0">
                                <div class="footer-menu-wrap">
                                    <div class="footer-menu-container">
                                        <h3 class="t-0 t-uppercase t-bold mt-0 mb-3">{{ __('Social network') }}</h3>
                                    </div>
                                    <div class="footer-menu-container">
                                        <a class="btn btn-icon btn-rounded mr-1 waves-effect waves-light" style="background-color: #6695BD; color: white" target="_blank" href="https://vk.com/ktk40_professionalitet">
                                            <i class="fab fa-vk" aria-hidden="true"></i>
                                        </a>
                                        <a class="btn btn-icon btn-rounded mr-1 waves-effect waves-light" style="background-color: #FF9205; color: white" target="_blank" href="https://ok.ru/ktk40">
                                            <i class="fab fa-odnoklassniki" aria-hidden="true"></i>
                                        </a>
                                        <a class="btn btn-icon btn-rounded mr-1 waves-effect waves-light" style="background-color: #229ED9; color: white" target="_blank" href="https://t.me/ktk40_professionalitet">
                                            <i class="fab fa-telegram" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                    <div class="footer-menu-container">
                                        <span id="sputnik-informer"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-wrap">
                    <div class="container">
                        <div class="row py-3">
                            <div class="col-12 d-block col-sm-12 d-sm-block col-md-12 d-md-block col-lg-6 d-lg-block col-xl-6 d-xl-block mb-lg-0 mb-3">
                                <a href="{{ config('app.url') }}">{{ __('information.name_organisation') }}</a>
                                &copy; {{ date('Y') }}. {{ __('All rights reserved') }}
                            </div>
                            <div class="col-12 d-block col-sm-12 d-sm-block col-md-12 d-md-block col-lg-6 d-lg-block col-xl-6 d-xl-block">
                                <div class="t-left t-lg-right l-inherit l-hover-underline-none l-hover-primary">
                                    <a href="https://vk,com/rufovsa"
                                       target="_blank">{{ __('Developed by Sergey Rufov') }}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </footer>
</div>
<script src="{{ url()->to('/') }}/build/jquery.js"></script>
@vite(['resources/js/app.js'])
<script src="{{ url()->to('/') }}/build/uhpv-full.min.js"></script>
</body>
</html>
