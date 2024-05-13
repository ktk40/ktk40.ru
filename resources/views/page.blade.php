<x-app-layout :title="$title" :description="$description" :breadcrumbs="$breadcrumbs" :isTranslate="$isTranslate">
<style>
    @media print {
        .print-100 {
            max-width: 100%!important;
            width: 100%!important;
            padding: 0;
            margin: 0;
        }

        .print-100.card {
            border: none
        }

        .print-100.card .card-body {
            padding: 0;
        }
    }

    .theme-dark .bg-gray-2 {
        background-color: #26292d !important;
    }

    .theme-dark .back-icon i {
        color: #fff
    }

    a[href$='.doc'],
    a[href$='.docx'],
    a[href$='.pdf'],
    a[href$='.PDF'],
    a[href$='.rar'],
    a[href$='.zip'],
    a[href$='.ppt'],
    a[href$='.pptx'],
    a[href$='.xls'],
    a[href$='.xlsx']{
        display: block;
        margin-bottom: 10px;
        padding: 10px 10px 10px 36px;
        border: 1px solid #dadada;
        border-radius: 5px;
        text-decoration: none;
        -webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
        -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
        box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
    }

    a[href$='.doc']:hover,
    a[href$='.docx']:hover,
    a[href$='.pdf']:hover,
    a[href$='.PDF']:hover,
    a[href$='.rar']:hover,
    a[href$='.zip']:hover,
    a[href$='.ppt']:hover,
    a[href$='.pptx']:hover,
    a[href$='.xls']:hover,
    a[href$='.xlsx']:hover{
        background-color: #ebdef4;
    }

    .theme-dark a[href$='.doc'],
    .theme-dark a[href$='.docx'],
    .theme-dark a[href$='.pdf'],
    .theme-dark a[href$='.PDF'],
    .theme-dark a[href$='.rar'],
    .theme-dark a[href$='.zip'],
    .theme-dark a[href$='.ppt'],
    .theme-dark a[href$='.pptx'],
    .theme-dark a[href$='.xls'],
    .theme-dark a[href$='.xlsx'] {
        border-color: #424549;
    }

    .theme-dark a[href$='.doc']:hover,
    .theme-dark a[href$='.docx']:hover,
    .theme-dark a[href$='.pdf']:hover,
    .theme-dark a[href$='.PDF']:hover,
    .theme-dark a[href$='.rar']:hover,
    .theme-dark a[href$='.zip']:hover,
    .theme-dark a[href$='.ppt']:hover,
    .theme-dark a[href$='.pptx']:hover,
    .theme-dark a[href$='.xls']:hover,
    .theme-dark a[href$='.xlsx']:hover{
        background-color: #222;
    }

    a[href$='.doc']:before,
    a[href$='.docx']:before,
    a[href$='.pdf']:before,
    a[href$='.PDF']:before,
    a[href$='.rar']:before,
    a[href$='.zip']:before,
    a[href$='.xlsx']:before,
    a[href$='.xls']:before,
    a[href$='.pptx']:before,
    a[href$='.ppt']:before {
        display: block;
        position: absolute;
        margin-left: -20px;
        margin-top: 5px;
    }

    a[href$='.doc']:before,
    a[href$='.docx']:before {
        font-family: 'FontAwesome', sans-serif;
        content: "\f1c2";
    }

    a[href$='.pdf']:before,
    a[href$='.PDF']:before {
        font-family: 'FontAwesome', sans-serif;
        content: "\f1c1";
    }

    a[href$='.rar']:before,
    a[href$='.zip']:before {
        font-family: 'FontAwesome', sans-serif;
        content: "\f1c6";
    }

    a[href$='.xlsx']:before,
    a[href$='.xls']:before {
        font-family: 'FontAwesome', sans-serif;
        content: "\f1c3";
    }

    a[href$='.pptx']:before,
    a[href$='.ppt']:before {
        font-family: 'FontAwesome', sans-serif;
        content: "\f1c4";
    }

    /*a[href$='.doc']:after,
    a[href$='.docx']:after,
    a[href$='.pdf']:after,
    a[href$='.PDF']:after,
    a[href$='.rar']:after,
    a[href$='.zip']:after,
    a[href$='.ppt']:after,
    a[href$='.pptx']:after,
    a[href$='.xls']:after,
    a[href$='.xlsx']:after{
        content: "";
        display: block;
        height: 1px;
        background: #dadada;
        margin-top: 10px;
        clear: both
    }*/

    a[href$=".doc"]:before, a[href$=".docx"]:before {
        color: #136ed6;
        font-size: 15px
    }

    a[href$=".pdf"]:before, a[href$=".PDF"]:before {
        color: #d61320;
        font-size: 15px
    }

    a[href$=".rar"]:before, a[href$=".zip"]:before {
        color: #995b0b;
        font-size: 15px
    }

    a[href$=".xlsx"]:before, a[href$=".xls"]:before {
        color: #286b13;
        font-size: 15px
    }

    a[href$=".pptx"]:before, a[href$=".ppt"]:before {
        color: #ff4800;
        font-size: 15px
    }

</style>
    @if (isset($breadcrumbs) && $breadcrumbs && $isContainer)
        <div class="container mt-4 print-100">
            @if ($sitebar)
                <div class="row print-100">
                    <div id="page_content" class="col-xl-8 print-100">
                        @if($cardBody)
                            <div class="card w-100 mb-4 print-100">
                                <div class="card-body">
                                    <div class="ex3">
                                        <h1>{{ $title }}</h1>
                                    </div>
                                    {!! $content !!}
                                </div>
                            </div>
                        @else
                            <div class="ex3">
                                <h1>{{ $title }}</h1>
                            </div>
                            {!! $content !!}
                        @endif
                    </div>
                    <div id="sitebar_content" class="col-xl-4 d-print-none mb-4">
                        <div id="sitebar_container">
                            <ul class="list-group">
                                @foreach($siteBarMenu as $value)
                                    @php
                                        $active = '';
                                        if ($value->url === $url) {
                                            $active = ' active';
                                        }
                                        $item_title = $value->title;
                                        if (!$item_title && app()->getLocale() == 'en' && $value->translate('ru'))
                                            $item_title = $value->translate('ru')->title;
                                    @endphp
                                    <li class="list-group-item{{ $active }}" aria-current="true">
                                        @if($active)
                                            <span>{{ $item_title }}</span>
                                        @else
                                            <a href="{{ config('app.url') }}/{{ $value->url }}">{{ $item_title }}</a>
                                        @endif
                                    </li>
                                @endforeach
                            </ul>

                            <div class="card w-100 mt-2 block_links">
                                <a href="{{ config('app.url') }}/sveden">
                                    <div class="p-2">
                                        <img src="{{ url()->to('/') }}/images/sveden.png" style="width:60px;margin-right:10px" alt="{{ __('Basic information about an educational organization') }}" />
                                    </div>
                                    <span>{{ __('Basic information about an educational organization') }}</span>
                                </a>
                            </div>
                            <div class="card w-100 mt-2 block_links">
                                <a href="{{ config('app.url') }} }}/life/schedule">
                                    <div class="p-2">
                                        <img src="{{ url()->to('/') }}/images/shedule_vuz.png" style="width:60px;margin-right:10px" alt="{{ __('Schedule') }}" />
                                    </div>
                                    <span>{{ __('Schedule') }}</span>
                                    <img src="{{ url()->to('/') }}/images/birdie.png" style="width:60px;margin-right:10px;position: absolute;right: 0;bottom: 0;" alt="{{ __('Schedule') }}" />
                                </a>
                            </div>
                            <div class="card w-100 mt-2 block_links">
                                <a href="{{ config('app.url') }}/legal/anti-corruption">
                                    <div class="p-2">
                                        <img src="{{ url()->to('/') }}/images/anti-corruption.png" style="width:60px;margin-right:10px" alt="{{ __('Anti-corruption') }}" />
                                    </div>
                                    <span>{{ __('Anti-corruption') }}</span>
                                </a>
                            </div>
                            <div class="card w-100 mt-2 block_links">
                                <a href="{{ config('app.url') }}/legal/security/personal-data">
                                    <div class="p-2">
                                        <img src="{{ url()->to('/') }}/images/personal-data.png" style="width:60px;margin-right:10px" alt="{{ __('Personal Data Processing Policy') }}" />
                                    </div>
                                    <span>{{ __('Personal Data Processing Policy') }}</span>
                                </a>
                            </div>
                            <div class="card w-100 mt-2 block_links">
                                <a href="{{ config('app.url') }}/legal/information-security">
                                    <div class="p-2">
                                        <img src="{{ url()->to('/') }}/images/information-security.png" style="width:67.82px;margin-right:10px" alt="{{ __('Information security') }}" />
                                    </div>
                                    <span>{{ __('Information security') }}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            @else
                {!! $content !!}
            @endif
        </div>
    @else
        {!! $content !!}
    @endisset
    <script>
        // Получаем нужный элемент
        //var element = document.getElementById('sitebar_content');

        function Visible() {
            target = document.getElementById('sitebar_container');
            if (document.documentElement.clientWidth <= 1199) {
                if (!target) return;
                document.getElementById('page_content').style = '';
                document.getElementById('sitebar_content').style = '';
                return;
            }

            if (!target) return;
            // Все позиции элемента
            var targetPosition = {
                    top: window.pageYOffset + target.getBoundingClientRect().top,
                    left: window.pageXOffset + target.getBoundingClientRect().left,
                    right: window.pageXOffset + target.getBoundingClientRect().right,
                    bottom: window.pageYOffset + target.getBoundingClientRect().bottom
                },
                // Получаем позиции окна
                windowPosition = {
                    top: window.pageYOffset,
                    left: window.pageXOffset,
                    right: window.pageXOffset + document.documentElement.clientWidth,
                    bottom: window.pageYOffset + document.documentElement.clientHeight
                };

            if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
                targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
                targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
                targetPosition.left < windowPosition.right
            ) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
                // Если элемент полностью видно, то запускаем следующий код
                //console.clear();
                //console.log('Вы видите элемент :)');
                document.getElementById('page_content').style = '';
                document.getElementById('sitebar_content').style = '';
            } else {
                // Если элемент не видно, то запускаем этот код
                //console.clear();
                //console.log('Вы НЕ элемент :)');
                document.getElementById('page_content').style.width = '100%';
                document.getElementById('page_content').style.maxWidth = '100%';
                document.getElementById('sitebar_content').style.visibility = 'hidden';
                document.getElementById('sitebar_content').style.position = 'absolute';
            }
        }

        // Запускаем функцию при прокрутке страницы
        window.addEventListener('scroll', function() {
            Visible();
        });

        // А также запустим функцию сразу. А то вдруг, элемент изначально видно
        Visible();
    </script>

</x-app-layout>
