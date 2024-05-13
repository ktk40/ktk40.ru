//import './waves.js';
var WOW = function (properties) {

    var config = properties || {};

    this._boxClass = config.boxClass || 'wow';
    this._animateClass = config.animateClass || 'animated',
        this._offset = config.offset || 0,
        this._mobile = (config.mobile === undefined) ? true : false;
    this._live = (config.live === undefined) ? true : false;

    this._seoFixEnabled = (config.seoFixEnabled === undefined) ? true : false;
    this._animationDuration = config.animationDuration || "1s";
    this._animationDelay = config.animationDelay || "0s";

    this._initStorageVariables();

};

WOW.prototype._initStorageVariables = function () {

    this._animation = [];
    this._boxes = [];
    this._cleanupBoxListener = [];
    this._cleanupBoxVisibleListener = [];

};

WOW.prototype.init = function () {

    if (!this._mobile && this._isMobile()) {
        return;
    }

    this._eachBoxInit(this._prepareBox.bind(this));

    this._startWow();

};

WOW.prototype._isMobile = function () {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};


WOW.prototype._eachBoxInit = function (each) {

    var boxes = document.getElementsByClassName(this._boxClass);

    for (var i = 0; i < boxes.length; i++) {

        (function (i) {
            each(boxes[i], i);
        })(i);

    }

};

WOW.prototype._prepareBox = function (box) {

    var index = this._boxes.push(box) - 1;
    this._animation[index] = {
        animationName: box.style.animationName || window.getComputedStyle(box, null).animationName
    };
    box.style.animationName = 'none';
    box.style.visibility = 'hidden';

};

WOW.prototype._startWow = function () {

    if (this._live) {
        this._checkForChanges();
    }
    if (this._scrollY() === 0 && this._seoFixEnabled) {
        this._seoFix();
    }

    this._appearInView();

    this._scrollHandler();

};

WOW.prototype._scrollY = function () {

    if (this._isInt(window.pageYOffset)) {
        return window.pageYOffset;
    }
    if (this._isInt(document.documentElement.scrollTop)) {
        return document.documentElement.scrollTop;
    }
    if (this._isInt(document.body.scrollTop)) {
        return document.body.scrollTop;
    }

};

WOW.prototype._isInt = function(value) {
    return typeof value === 'number' &&
        isFinite(value) &&
        Math.floor(value) === value;
};

WOW.prototype._seoFix = function () {

    this._showNotInView();

};


WOW.prototype._appear = function (box, i) {

    var animationState = box.style.animationPlayState || box.style.WebkitAnimationPlayState;

    if (box.className.indexOf(this._animateClass) === -1) {

        delete this._boxes[i];

        this._onStartAnimation(box, i);
        this._onStopAnimation(box, i);

        this._animate(box, i, this._getAnimationConfig(box));

    }

};

WOW.prototype._onStartAnimation = function (box, i) {

    this._cleanupBoxVisibleListener[i] = this._boxVisible.bind(this, box, i);

    box.addEventListener('animationstart', this._cleanupBoxVisibleListener[i]);
    box.addEventListener('webkitAnimationStart', this._cleanupBoxVisibleListener[i]);

};

WOW.prototype._onStopAnimation = function (box, i) {

    this._cleanupBoxListener[i] = this._cleanupBox.bind(this, box, i);

    box.addEventListener('animationend', this._cleanupBoxListener[i]);
    box.addEventListener('webkitAnimationEnd', this._cleanupBoxListener[i]);

};

WOW.prototype._getAnimationConfig = function (box) {

    return {

        delay: this._getDelay(box),
        duration: this._getDuration(box),
        iterations: this._getIterations(box)

    }

};

WOW.prototype._getDelay = function (box) {

    return box.getAttribute('data-wow-delay') || this._animationDelay;

};

WOW.prototype._getDuration = function (box) {

    return box.getAttribute('data-wow-duration') || this._animationDuration;

};

WOW.prototype._getIterations = function (box) {

    return box.getAttribute('data-wow-iteration') ||
        box.style.animationIterationCount ||
        window.getComputedStyle(box, null).animationIterationCount ||
        1;

};

WOW.prototype._animate = function (box, i, config) {

    box.style.animationDelay = config.delay;
    box.style.animationDuration = config.duration;
    box.style.animationIterationCount = config.iterations;
    box.style.animationName = this._animation[i].animationName;
    box.className += (' ' + this._animateClass);

};

WOW.prototype._boxVisible = function (box, i) {

    box.style.visibility = 'visible';

    box.removeEventListener('animationstart', this._cleanupBoxVisibleListener[i]);
    box.removeEventListener('webkitAnimationStart', this._cleanupBoxVisibleListener[i]);

    delete this._cleanupBoxVisibleListener[i];

};

WOW.prototype._cleanupBox = function (box, i) {

    box.style.animationDelay = '';
    box.style.animationDuration = '';
    box.style.animationIterationCount = '';
    box.style.animationName = 'none';

    this._cleanupClass(box);

    box.removeEventListener('animationend', this._cleanupBoxListener[i]);
    box.removeEventListener('webkitAnimationEnd', this._cleanupBoxListener[i]);

    delete this._cleanupBoxListener[i];

};

WOW.prototype._cleanupClass = function (box) {

    var classArray = box.className.split(' ');
    var animateIndex = classArray.indexOf(this._animateClass);

    if (animateIndex !== -1) {

        classArray.splice(animateIndex, 1);
        box.className = classArray.join(' ');

    }

};

WOW.prototype._eachBox = function (each) {

    for (var i = 0; i < this._boxes.length; i++) {

        var box = this._boxes[i];

        if (box) {

            (function (i) {
                each(this._boxes[i], i);
            }.bind(this))(i);

        }

    }

};

WOW.prototype._scrollHandler = function () {

    this._hideSeoFixListener = this._hideSeoFix.bind(this);

    window.addEventListener('scroll', this._hideSeoFixListener);
    window.addEventListener('scroll', this._appearInView.bind(this));
    window.addEventListener('resize', this._appearInView.bind(this));

};

WOW.prototype._hideSeoFix = function () {

    window.removeEventListener('scroll', this._hideSeoFixListener);
    delete this._hideSeoFixListener;

    this._eachBox(function (box, i) {

        if (!this._isInView(box)) {
            box.style.visibility = "hidden";
        }

    }.bind(this));

};

WOW.prototype._appearInView = function () {

    this._eachBox(function (box, i) {
        this._animateBox(box, i);
    }.bind(this));

};

WOW.prototype._animateBox = function (box, i) {

    if (this._isInView(box)) {
        delete this._boxes[i];
        this._appear(box, i);
    }

};

WOW.prototype._showNotInView = function () {

    this._eachBox(function (box, i) {
        this._makeVisible(box, i);
    }.bind(this));

};

WOW.prototype._makeVisible = function (box, i) {

    if (!this._isInView(box)) {
        this._boxes[i].style.visibility = 'visible';
    }

};

WOW.prototype._isInView = function (box) {

    var offset = box.getAttribute('data-wow-offset') || this._offset;
    var boxTopOffset = this._getElementOffset(box);

    var triggerOffset = boxTopOffset + ~~offset;

    var bottomPosition = window.innerHeight + this._scrollY();

    return triggerOffset <= bottomPosition && (triggerOffset === 0 ? 10 : triggerOffset) >= this._scrollY();

};

WOW.prototype._getElementOffset = function (box) {

    var clientRect = box.getBoundingClientRect();

    var body = document.body;

    var scrollTop = this._scrollY();
    var clientTop = document.documentElement.clientTop || body.clientTop || 0;

    var top  = clientRect.top +  scrollTop - clientTop;

    return Math.round(top);

};

WOW.prototype._checkForChanges = function () {

    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    var observer = new MutationObserver(this._mutations.bind(this));

    var config = {
        childList: true,
        subtree: true
    };
    window.onload = function() {
        observer.observe(document.body, config);
    }
};

WOW.prototype._mutations = function (mutations) {

    mutations.forEach(function (mutation) {

        for (var i = 0; i < mutation.addedNodes.length; i++) {
            this.doSync(mutation.addedNodes[i]);
        }

    }.bind(this));

};

WOW.prototype.doSync = function (node) {
    if (typeof node.className == "string") {
        var classes = node.className.split(' ');
        if (classes.indexOf(this._boxClass) !== -1) {
            this._prepareBox(node);
        }
    }
};

window.addEventListener("DOMContentLoaded", function(e) {
    new WOW().init();

    /*$(document).on('lazybeforeunveil', function(e){
        var ajax = $(e.target).data('ajax');
        if(ajax){
            $(e.target).load(ajax);
        }
    });*/
});
try {
    window.KTK = SF || {};
} catch (error) {
    window.KTK = {};
}
/*============================= */

KTK.Methods = function() {

    /**
     * extend() -
     * @param {*} defaults
     * @param {*} options
     */
    this.extend = function(defaults, options) {
        for(var key in options)
            if(options.hasOwnProperty(key))
                if(Object.prototype.toString.call(options[key]) == '[object Object]')
                    this.extend(defaults[key], options[key]);
                else defaults[key] = options[key];
        return defaults;
    }

    /**
     * Поиск наивысшего z-index в документе
     */
    this.topZIndex = function() {
        var e = document.querySelectorAll('*'),
            z = 1,
            style = '';
        for(var k = 0; k < e.length; k++) {
            style = getComputedStyle(e[k]);
            if(parseInt(style.zIndex) > z)
                z = parseInt(style.zIndex);
        }
        return z;
    }

    this.topZIndexElement = function(el) {
        var z = 1,
            e = false,
            style = '';
        for(var k = 0; k < el.length; k++) {
            style = getComputedStyle(el[k]);
            if(parseInt(style.zIndex) > z) {
                z = parseInt(style.zIndex);
                e = el[k];
            }
        }
        return e;
    }

    /**
     *
     */
    this.includeScript = function(path) {
        var s = document.createElement('script');
        s.src = path;
        document.querySelector('head').appendChild(s);
    }

    this.addcss = function(path) {
        var l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = path;
        // Удаляем если повтор
        if (document.querySelector("link[href='"+path+"']")) document.querySelector("link[href='"+path+"']").remove();
        document.querySelector('head').appendChild(l);
        return l;
    }

    /**
     *
     */
    this.cookies = {
        /**
         * get() - получить куки
         */
        get: function(name) {
            if(document.cookie.length > 0) {
                var start = document.cookie.indexOf(name + '=');
                if(start != -1) {
                    start = start + name.length + 1;
                    var end = document.cookie.indexOf(';', start);
                    if(end == -1) end = document.cookie.length;
                    return encodeURI(document.cookie.substring(start, end));
                }
            }
            return '';
        },
        /**
         * set() - установить куки
         */
        set: function(name, value, expiredays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays);
            document.cookie = name + '=' + decodeURI(value) +
                ((expiredays == null) ? '' : '; expires=' + exdate.toUTCString()) + '; path=/';
        },
        /**
         * check() - Проверка установлен ли параметр куки
         */
        check: function(name) {
            name = this.cookie.get(name);
            if(name != null && name != '') return true;
            else return false;
        }
    }


    this.bytelength = function(str) {
        var count = 0,
            ch = 0;
        for(var k = 0; k < str.length; k++) {
            ch = str.charCodeAt(k);
            if(ch <= 127) count++;
            else if(ch <= 2047) count += 2;
            else if(ch <= 65535) count += 3;
            else if(ch <= 2097151) count += 4;
            else if(ch <= 67108863) count += 5;
            else count += 6;
        }
        return count;
    }

    this.bytelengthlimit = function(str, limit) {
        var count = 0,
            ch = 0,
            strlimit = '',
            flaglimit = false,
            result = [];
        for(var k = 0; k < str.length; k++) {
            ch = str.charCodeAt(k);
            if(count <= limit) {
                flaglimit = true;
            }
            strlimit += str[k];
            if(ch <= 127) count++;
            else if(ch <= 2047) count += 2;
            else if(ch <= 65535) count += 3;
            else if(ch <= 2097151) count += 4;
            else if(ch <= 67108863) count += 5;
            else count += 6;

            if((count > limit && flaglimit) || (flaglimit && k == str.length - 1)) {
                //console.log(strlimit)
                result.push(strlimit);
                strlimit = '';
                count = 0;
                flaglimit = false;
            }
        }
        //console.log(result.length)
        if(result.length > 0) {
            //result.push(strlimit);
            return result;
        } else {
            result.push(strlimit);
            return result;
        }
    }
}
KTK.send = function(event, element) {
    if(document.createEvent){
        var e = document.createEvent('Events');
        e.initEvent(event, true, false);
    }
    else if(document.createEventObject()) {
        var e = document.createEventObject();
    }
    else return;

    if(element.dispatchEvent)
        element.dispatchEvent(e);
    else if(element.fireEvent) element.fireEvent(event, e);
}

KTK.receive = function(event, el, handler) {
    if(window.addEventListener)
        el.addEventListener(event, handler, false);
    else if(window.attachEvent)
        el.attachEvent(event, handler);
}

/*============================= */
KTK.Events = function() {

    /**
     * Метод send() - Отправляет событие
     * @param {*} event
     */
    this.send = function(event, element) {
        if(document.createEvent){
            var e = document.createEvent('Events');
            e.initEvent(event, true, false);
        }
        else if(document.createEventObject()) {
            var e = document.createEventObject();
        }
        else return;

        if(element.dispatchEvent)
            element.dispatchEvent(e);
        else if(element.fireEvent) element.fireEvent(event, e);
    }

    /**
     * Метод receive() - регистрирует обработчик события
     * @param {*} event
     * @param {*} handler
     */
    this.receive = function(event, el, handler) {
        if(window.addEventListener)
            el.addEventListener(event, handler, false);
        else if(window.attachEvent)
            el.attachEvent(event, handler);
    }

    /**
     * hotkey() - функция обработки нажатия нескольких клавиш и выполнения фукций обработчика
     * @param {*} handler - функтция обработчик события нажатия клавиш
     * @param {*} далее может следовать любое количество кодов сочетания клавиш в
     * кавычках ("17")
     */
    this.hotkey = function(handler) {
        var codes = [].slice.call(arguments, 1),
            pressed = {};
        document.addEventListener('keydown', function(e) {
            e = e || window.event;
            pressed[e.keyCode] = true;
            for (var i = 0; i < codes.length; i++)
                if (!pressed[codes[i]]) return;
            pressed = {};
            handler();
        });
        document.addEventListener('keyup',function(e) {
            e = e || window.event;
            delete pressed[e.keyCode];
        });
    }

    /**
     * quickkey() - функция обработки нажатия клавиши и выполнения функции обработчика
     * @param {*} handler - функция обработчик события нажатия клавиши
     * @param {*} key - клавиша после нажатия которой срабатывает функция обрботчик
     */
    this.quickkey = function(handler, key) {
        addEventListener('keydown', function(e) {
            if(e.keyCode == key)
                handler(e);
        });
    }

    KTK.Methods.call(this);
}

KTK.Parameters = function() {
    /**
     * newparams - генерация новых параметров
     */
    this.newparams = function() {
        return this.params;
    }

    /**
     * Обновление существующих параметров
     * @param {*} el
     */
    this.updateparams = function(el) {
        var par = el.params,
            mod = par.modifier,
            data = par.data;
        for(var key in mod) {
            mod[key] = el.hasAttribute(data[key]) ? mod[key] + ' ' + el.getAttribute(data[key]) : mod[key];
        }
    }

// ================ CONSTRUCTOR ================ //
    this.params = {
        ajax: {
            events: {
                init: 'ajaxinit',
                load: 'endcontentload',
            },
            method: 'GET',
            type: 'html',
            timeout: 0,
            async: true,
            emulateOnload: true,
            cache: true
        },
        controller: {

        },
        search: {

        },
        provider: {

        },
        blocks: {
            special: {
                cookies: {
                    specialfont: 'default',
                    specialstate: 'off',
                    specialcolor: 'specialwhite',
                    specialkegl: '16',
                    specialinterval: '1.0',
                    specialkerning: 'normal',
                    specialimage: 'off',
                    specialup: 'down',
                    specialsound: 'off',
                },
                events: {
                    init: 'specialinit',
                    create: 'specialcreate',
                    open: 'specialopen',
                    close: 'specialoff',
                    up: 'specialup',
                    soundon: 'specialsoundon',
                    soundoff: 'specialsoundoff',
                    defaultsetting: 'specialdefaultsetting',
                    // События панели Special
                    fontsans: 'specialfontsans',
                    fontserif: 'specialfontserif',
                    fontmono: 'specialfontmono',
                    keglmore: 'specialkeglmore',
                    keglless: 'specialkeglless',
                    intervalone: 'specialintervalone',
                    intervalhalf: 'specialintervalhalf',
                    intervaltwo: 'specialintervaltwo',
                    imageoff: 'specialimageoff',
                    imageblack: 'specialimageblack',
                    imagecolor: 'specialimagecolor',
                    colorwhite: 'specialcolorwhite',
                    colorblack: 'specialcolorblack',
                    coloryellow: 'specialcoloryellow',
                    colorblue: 'specialcolorblue',
                    colorgreen: 'specialcolorgreen',
                    kerningnormal: 'specialkerningnormal',
                    kerningmiddle: 'specialkerningmiddle',
                    kerningbig: 'specialkerningbig',
                },
                data: {
                    init: 'ktk-special',
                    panel: 'ktk-special-panel',
                    kegl: 'ktk-special-kegl',
                    interval: 'ktk-special-interval',
                    color: 'ktk-special-color',
                    img: 'ktk-special-img',
                    on: 'ktk-special-on',
                },
                attributes: {

                },
                modifier: {
                    panel: 'special-panel d-flex align-items-start justify-content-center flex-wrap flex-row w-100 bb-1',
                    font: 'd-flex align-items-center justify-content-center flex-column p-3',
                    kegl: 'd-flex align-items-center justify-content-center flex-column p-3',
                    interval: "d-flex align-items-center justify-content-center flex-column p-3",
                    kerning: 'd-flex align-items-center justify-content-center flex-column p-3',
                    color: "d-flex align-items-center justify-content-center flex-column p-3",
                    img: "d-flex align-items-center justify-content-center flex-column p-3",
                    onoff: "d-flex align-items-center justify-content-center flex-column p-3",
                    sound: "d-flex align-items-center justify-content-center flex-column p-3",
                    black: 'ktk-special-black',
                    white: 'ktk-special-white',
                    yellow: 'ktk-special-yellow',
                    blue: 'ktk-special-blue',
                    green: 'ktk-special-green',
                    // Путь до стилей
                    specialwhite: '/simai/asset/simai.framework/sf4.master/plugin/special/css/white.min.css',
                    specialblack: '/simai/asset/simai.framework/sf4.master/plugin/special/css/black.min.css',
                    specialyellow: '/simai/asset/simai.framework/sf4.master/plugin/special/css/yellow.min.css',
                    specialblue: '/simai/asset/simai.framework/sf4.master/plugin/special/css/blue.min.css',
                    specialgreen: '/simai/asset/simai.framework/sf4.master/plugin/special/css/green.min.css',
                    specialsoundscript: 'https://webasr.yandex.net/jsapi/v1/webspeechkit.js',
                },
            },
            modal: {
                load: '<div class="ktk-progress"><div class="ktk-progress-animation"></div></div>',
                events: {
                    init: 'modalinit',
                    create: "modalcreate",
                    open: 'modalopen',
                    close: 'modalclose',
                },
                data: {
                    init: 'ktk-modal',
                    src: 'ktk-src',
                    modal: 'ktk-modal-modifier',
                    content: 'ktk-content-modifier',
                    close: "ktk-close-modifier",
                    overlay: 'ktk-overlay-modifier',
                    blur: 'ktk-blur',
                    iframe: 'ktk-iframe',
                },
                attributes: {
                    overlay: 'ktk-modal-overlay',
                    load: 'ktk-modal-loadanimation',
                    modal: 'ktk-modal-area',
                    content: 'ktk-modal-content',
                    close: 'ktk-modal-close',
                    number: 'ktk-modal-number'
                },
                modifier: {
                    src: '',
                    service: 'ktk-service-bottom-area',
                    container: 'ktk-modal-container',
                    overlay: 'ktk-modal-overlay',
                    load: 'ktk-modal-load',
                    modal: 'ktk-modal-area',
                    content: 'ktk-modal-content ktk-scroll',
                    close: 'ktk-close',
                    blur: 'blur',
                    page: 'ktk-pagewrap-area',
                },
            },
            ajaxload: {
                load: '<div class="ktk-progress"><div class="ktk-progress-animation"></div></div>',
                events: {
                    init: 'ajaxloadinit',
                    cancel: 'ajaxloadcanceltrack',
                    create: 'ajaxloadcreate',
                },
                data: {
                    init: 'ktk-ajaxload',
                    src: 'ktk-src',
                    cancel: 'ktk-canceltrack',
                    loaded: 'ktk-ajaxloaded',
                },
                attributes: {

                },
                modifier: {
                    src: '',
                },
            }
        },
    }
// ================ END CONSTRUCTOR ================ //
}
KTK.Controller = function() {
    // Constructor

    this.stack = stack;
    var _this = this;

    // Подключение модулей
    KTK.Events.call(this);
    KTK.Search.call(this);
    KTK.Blocks.call(this);
    KTK.Provider.call(this);
    //KTK.Property.call(this);

    if(this.el) {
        this.send('blocksstart', this.el);
    } else {

        if(this.stack.ev('specialinit')) {

            this.receive('specialinit', window, function(e) {
                new KTK.Special(e.target, e.target.params);
            });
            this.stack.events.push('specialinit');
        }

        if(this.stack.ev('searchend')) {
            this.receive('searchend', window, function(e) {
                _this.send('blocksstart', e.target);
            });
            this.send('searchstart', window);
            this.stack.events.push('searchend');

        }
    }

    // end Constructor
}
/**
 * Search модуль поиска инициализаций т.е. поиска элементов вызывающих определенные блоки/компоненты
 */
KTK.Search = function() {
    /**
     * Search uninitialized Modal Window
     * Поиск неинициализированных модальных окон
     */
    this.search = function() {
        var el = document.body.querySelectorAll('*');   // Поиск всех элементов в DOM-дереве
        for(var j = 0; j < el.length; j++) {    // Обход найденых элементов
            var par = new KTK.Parameters();
            var params = par.newparams();         // Новые параметры
            for(var key in params.blocks) {    // Проверка
                var init = el[j],
                    block = params.blocks[key];
                if(init.hasAttribute(block.data.init)) {    // Проверяем есть ли у элемента инициализация блока
                    var i = 0;
                    for(var k = 0; k < this.stack.el.length; k++)   // Проверяем был ли инициализированн текущий элемен ранее
                        if(this.stack.el[k] == init) i++;
                    if(i == 0) {
                        init.blocks = key;          // Записываем наименование блока
                        init.params = block;  // Присваиваем инициализатору список стандратных параметров
                        par.updateparams(init);
                        this.send('searchend', init); // Отправка сигнала (события) на элемент для дальнейшего построения
                    }
                }
            }
        }
    }

    this.searchModal = function(element) {
        var el = element.querySelectorAll('[ktk-modal]');   // Поиск всех элементов в DOM-дереве
        for(var j = 0; j < el.length; j++) {    // Обход найденых элементов
            var par = new KTK.Parameters();
            var params = par.newparams();         // Новые параметры
            for(var key in params.blocks) {    // Проверка
                var init = el[j],
                    block = params.blocks[key];
                if(init.hasAttribute(block.data.init)) {    // Проверяем есть ли у элемента инициализация блока
                    var i = 0;
                    for(var k = 0; k < this.stack.el.length; k++)   // Проверяем был ли инициализированн текущий элемен ранее
                        if(this.stack.el[k] == init) i++;
                    if(i == 0) {
                        init.blocks = key;          // Записываем наименование блока
                        init.params = block;  // Присваиваем инициализатору список стандратных параметров
                        par.updateparams(init);
                        this.send('searchend', init); // Отправка сигнала (события) на элемент для дальнейшего построения
                    }
                }
            }
        }
    }


    this.searchdata = function(content) {
        var el = content.querySelectorAll('*');   // Поиск всех элементов в DOM-дереве
        for(var j = 0; j < el.length; j++) {    // Обход найденых элементов
            var par = new KTK.Parameters();
            var params = par.newparams();         // Новые параметры
            for(var key in params.blocks) {    // Проверка
                var init = el[j],
                    block = params.blocks[key];
                if(init.hasAttribute(block.data.init)) {    // Проверяем есть ли у элемента инициализация блока
                    var i = 0;
                    for(var k = 0; k < this.stack.el.length; k++)   // Проверяем был ли инициализированн текущий элемен ранее
                        if(this.stack.el[k] == init) i++;
                    if(i == 0) {
                        init.blocks = key;          // Записываем наименование блока
                        init.params = block;  // Присваиваем инициализатору список стандратных параметров
                        par.updateparams(init);
                        this.send('searchend', init); // Отправка сигнала (события) на элемент для дальнейшего построения
                    }
                }
            }
        }
    }

    // ================ CONSTRUCTOR ================ //
    var _this = this;
    if(this.stack.ev('searchstart')) {
        this.receive('searchstart', window, function(e) {
            _this.search();
        });
        this.receive('searchstartmodal', window, function(e) {
            _this.searchModal(document);
        });
        this.stack.events.push('searchstart');
    }
    // ================ END CONSTRUCTOR ================ //
}
/**
 * Blocks - модуль распределения обязанностей
 */
KTK.Blocks = function() {
    var _this = this;

    if(this.stack.ev('providerend')) {
        this.receive('providerend', window, function(e) {
            _this.send(e.target.event, e.target);
        });
        this.stack.events.push('providerend');
    }

    if(this.stack.ev('blocksstart')) {
        this.receive('blocksstart', window, function(e) {
            _this.send('providerstart', e.target);
        });
        this.stack.events.push('blocksstart')
    }


}
/**
 * ProviderDom - модуль создания блоков, другими словами поставщик блоков/компонентов
 */
KTK.Provider = function() {

    this.special = function(e) {

        function selectcolor() {
            switch(_this.cookies.get('specialcolor')) {
                case 'specialwhite':
                    return getMessage("KTK_SPECIAL__SPECIAL_WHITE");
                case 'specialblack':
                    return getMessage("KTK_SPECIAL__SPECIAL_BLACK");
                case 'specialyellow':
                    return getMessage("KTK_SPECIAL__SPECIAL_YELLOW");
                case 'specialblue':
                    return getMessage("KTK_SPECIAL__SPECIAL_BLUE");
                case 'specialgreen':
                    return getMessage("KTK_SPECIAL__SPECIAL_GREEN");
            }
            return getMessage("KTK_SPECIAL__SPECIAL_WHITE");
        }

        function selectkegl() {
            var v = _this.cookies.get('specialkegl');
            if(v != '') return v + getMessage("KTK_SPECIAL__SPECIAL_KEGL");
            else return getMessage("KTK_SPECIAL__KEGL_16");
        }

        function selectkerning() {
            switch(_this.cookies.get('specialkerning')) {
                case 'normal':
                    return getMessage("KTK_SPECIAL__KERNING_NORMAL");
                case 'middle':
                    return getMessage("KTK_SPECIAL__KERNING_MIDDLE");
                case 'big':
                    return getMessage("KTK_SPECIAL__KERNING_BIG");
            }
            return getMessage("KTK_SPECIAL__KERNING_NORMAL");
        }

        function selectimg() {
            switch(_this.cookies.get('specialimage')) {
                case 'off':
                    return getMessage("KTK_SPECIAL__IMG_OFF");
                case 'onblack':
                    return getMessage("KTK_SPECIAL__IMG_ON_BLACK");
                case 'oncolor':
                    return getMessage("KTK_SPECIAL__IMG_ON_COLOR");
            }
            return getMessage("KTK_SPECIAL__IMG_OFF");
        }

        // changes between image mode
        // blackwhite, color and off
        function changeStateAlt(state)
        {

            if(state == 'off')
            {
                document.querySelectorAll('.ktk-special-hidden').forEach((elem) => {
                    elem.classList.remove('ktk-special-hidden');
                    elem.classList.add('ktk-special-show')
                });

                // hide static images and creating div to display alt text
                document.querySelectorAll('main img').forEach((elem) => {
                    elem.classList.remove('ktk-special-show');
                    elem.classList.add('ktk-special-hidden')
                    var myAltText = document.createElement('div');
                    myAltText.classList.add('ktk-special-show');
                    myAltText.classList.add('ktk-special-alt-text');
                    myAltText.classList.add('t-center');
                    myAltText.innerText = elem.alt;
                    elem.parentNode.insertBefore(myAltText, elem);
                });
            }
            else if(state == 'onblack' || state == 'oncolor')
            {
                document.querySelectorAll('.ktk-special-show').forEach((elem) => {
                    elem.classList.add('ktk-special-hidden');
                    elem.classList.remove('ktk-special-show');
                });

                // show static images
                document.querySelectorAll('main img').forEach((elem) => {
                    elem.classList.remove('ktk-special-hidden');
                    elem.classList.add('ktk-special-show')
                });

                // delete div with alt text
                document.querySelectorAll('.ktk-special-alt-text').forEach((elem) => {
                    elem.remove();
                });
            }
        }

        function selectinterval() {
            switch(_this.cookies.get('specialinterval')) {
                case '1.0':
                    return getMessage("KTK_SPECIAL__INTERVAL_1_0");
                case '1.5':
                    return getMessage("KTK_SPECIAL__INTERVAL_1_5");
                case '2.0':
                    return getMessage("KTK_SPECIAL__INTERVAL_2_0");
            }
            return getMessage("KTK_SPECIAL__INTERVAL_1_0");
        }

        function addbtn(btn, param) {
            btn.className = param.class;
            btn.style.backgroundColor = param.background;
            btn.style.borderColor = 'black';
            btn.style.color = param.border;
            btn.style.fontSize = param.font;
            btn.innerHTML = param.text;
            btn.title = param.title;
        }

        function selectfont() {
            //console.log(_this.cookies.get('specialfont'));
            switch(_this.cookies.get('specialfont')) {
                case 'default':
                    return getMessage("KTK_SPECIAL__FONT_DEFAULT");
                case 'sans':
                    return getMessage("KTK_SPECIAL__FONT_SANS");
                case 'serif':
                    return getMessage("KTK_SPECIAL__FONT_SERIF");
                case 'mono':
                    return getMessage("KTK_SPECIAL__FONT_MONO");
            }
            return getMessage("KTK_SPECIAL__FONT_DEFAULT");
        }

        function selectsound() {
            switch(_this.cookies.get('specialsound')) {
                case 'on':
                    return getMessage("KTK_SPECIAL__SOUND_ON");
                case 'off':
                    return getMessage("KTK_SPECIAL__SOUND_OFF");
                default:
                    return getMessage("KTK_SPECIAL__SOUND_OFF");
            }
        }

        var _this = this,
            par = e.target.params,
            el = e.target;

        var panel = {
            font: {
                name: {},
                content: {
                    btnsans: {},    // Arial
                    btnserif: {},   // Times New Roman
                    btnmono: {},    // Courier New
                },
                status: {},
            },
            kegl: {
                name: {},
                content: {
                    btnmore: {},
                    btnless: {},
                },
                status: {},
            },
            interval: {
                name: {},
                content: {
                    btnone: {},
                    btnhalf: {},
                    btntwo: {},
                },
                status: {},
            },
            kerning: {
                name: {},
                content: {
                    btnnormal: {},
                    btnmiddle: {},
                    btnbig: {},
                },
                status: {},
            },
            color: {
                name: {},
                content: {
                    btnwhite: {},
                    btnblack: {},
                    btnyellow: {},
                    btnblue: {},
                    btngreen: {},
                },
                status: {},
            },
            img: {
                name: {},
                content: {
                    btnoff: {},
                    btnbw: {},
                    btncolor: {},
                },
                status: {},
            },
            sound: {
                name: {},
                content: {
                    btnon:{},
                    btnoff: {},
                },
                status: {},
                play: {},
            },
            onoff: {
                name: {},
                content: {
                    btnup: {},
                    btndefault: {},
                    btnonoff: {},
                },
                status: {},
            },
        };

        panel = document.createElement('nav');

        panel.className = par.modifier.panel;
        panel.setAttribute('ktk-special-panel', '');
        panel.style.backgroundColor = "#FFFFFF";
        panel.style.position = 'relative';
        panel.style.transition = 'margin-top 1s ease';

        panel.font = document.createElement('div');
        panel.font.className = par.modifier.font;

        panel.font.name = document.createElement('div');
        panel.font.content = document.createElement('div');
        panel.font.status = document.createElement('div');

        panel.font.name.classList.add('font-text', 'mb-2');
        panel.font.name.style.color = 'rgba(0,0,0, 0.87)';
        panel.font.name.innerHTML = getMessage("KTK_SPECIAL__FONT");

        panel.font.appendChild(panel.font.name);

        panel.font.content.classList.add('font-content', 'btn-group');
        panel.font.content.btnsans = document.createElement('button');
        panel.font.content.btnserif = document.createElement('button');
        panel.font.content.btnmono = document.createElement('button');

        addbtn(
            panel.font.content.btnsans,
            {
                class: 'btn btn-outline px-3',
                background: 'white',
                border: 'black',
                font: '14px',
                text: 'Arial',
                title: getMessage("KTK_SPECIAL__BTN_SANS_ARIAL"),
            }
        );

        panel.font.content.btnsans.addEventListener('click', function(e) {
            _this.send(par.events.fontsans, panel.font.content.btnsans);
            panel.font.status.innerHTML = getMessage("KTK_SPECIAL__BTN_SANS");
        });

        addbtn(
            panel.font.content.btnserif,
            {
                class: 'btn btn-outline px-3',
                background: 'white',
                border: 'black',
                font: '14px',
                text: 'Times',
                title: getMessage("KTK_SPECIAL__BTN_SERIF_TIMES"),
            }
        );

        panel.font.content.btnserif.addEventListener('click', function(e) {
            _this.send(par.events.fontserif, panel.font.content.btnserif);
            panel.font.status.innerHTML = getMessage("KTK_SPECIAL__BTN_SERIF");
        });

        addbtn(
            panel.font.content.btnmono,
            {
                class: 'btn btn-outline px-3',
                background: 'white',
                border: 'black',
                font: '14px',
                text: 'Courier',
                title: getMessage("KTK_SPECIAL__BTN_MONO_COURIER"),
            }
        );

        panel.font.content.btnmono.addEventListener('click', function(e) {
            _this.send(par.events.fontmono, panel.font.content.btnmono);
            panel.font.status.innerHTML = getMessage("KTK_SPECIAL__BTN_MONO");
        });


        panel.font.status.classList.add('status-text', 'mt-2');
        panel.font.status.style.color = 'rgba(0,0,0, 0.87)';
        panel.font.status.innerHTML = selectfont();

        panel.font.content.appendChild(panel.font.content.btnsans);
        panel.font.content.appendChild(panel.font.content.btnserif);
        panel.font.content.appendChild(panel.font.content.btnmono);

        panel.font.appendChild(panel.font.content);
        panel.font.appendChild(panel.font.status);
        panel.appendChild(panel.font);

        // #endregion Font

        panel.kegl = document.createElement('div');
        panel.kegl.className = par.modifier.kegl;

        panel.kegl.name = document.createElement('div');
        panel.kegl.content = document.createElement('div');
        panel.kegl.status = document.createElement('div');

        panel.kegl.name.classList.add('kegl-text', 'mb-2');
        panel.kegl.name.style.color = 'rgba(0,0,0,0.87)';
        panel.kegl.name.innerHTML = getMessage("KTK_SPECIAL__KEGL");

        panel.kegl.appendChild(panel.kegl.name);

        panel.kegl.content.classList.add('kegl-content', 'btn-group');

        panel.kegl.content.btnmore = document.createElement('button');
        panel.kegl.content.btnless = document.createElement('button');

        addbtn(
            panel.kegl.content.btnmore,
            {
                class: 'btn btn-outline px-3',
                background: 'white',
                border: 'black',
                font: '14px',
                text: 'A-',
                title: getMessage("KTK_SPECIAL__BTN_MORE"),
            }
        );
        panel.kegl.content.btnmore.addEventListener('click', function(e) {
            _this.send(par.events.keglmore, panel.kegl.content.btnmore);
            panel.kegl.status.innerHTML = selectkegl();
        });
        addbtn(
            panel.kegl.content.btnless,
            {
                class: 'btn btn-outline px-3',
                background: 'white',
                border: 'black',
                font: '14px',
                text: 'A+',
                title: getMessage("KTK_SPECIAL__BTN_LESS"),
            }
        );
        panel.kegl.content.btnless.addEventListener('click', function(e) {
            _this.send(par.events.keglless, panel.kegl.content.btnless);
            panel.kegl.status.innerHTML = selectkegl();
        });

        panel.kegl.status.classList.add('status-text', 'mt-2');
        panel.kegl.status.style.color = 'rgba(0,0,0, 0.87)';
        panel.kegl.status.innerHTML = selectkegl();


        panel.kegl.content.appendChild(panel.kegl.content.btnmore);
        panel.kegl.content.appendChild(panel.kegl.content.btnless)
        panel.kegl.appendChild(panel.kegl.content);
        panel.kegl.appendChild(panel.kegl.status);
        panel.appendChild(panel.kegl);

        // #region Kerning ===========================
        panel.kerning = document.createElement('div');
        panel.kerning.className = par.modifier.kerning;
        panel.kerning.name = document.createElement('div');
        panel.kerning.content = document.createElement('div');
        panel.kerning.status = document.createElement('div');

        panel.kerning.name.classList.add('name-text', 'mb-2');
        panel.kerning.name.style.color = 'rgba(0,0,0,0.87)';
        panel.kerning.name.innerHTML = getMessage("KTK_SPECIAL__KERNING");

        panel.kerning.appendChild(panel.kerning.name);

        panel.kerning.content.classList.add('kerning-content', 'btn-group');

        panel.kerning.status.classList.add('status-text', 'mt-2');
        panel.kerning.status.style.color = 'rgba(0,0,0,0.87)';
        panel.kerning.status.innerHTML = selectkerning();

        panel.kerning.content.btnnormal = document.createElement('button');
        panel.kerning.content.btnmiddle = document.createElement('button');
        panel.kerning.content.btnbig = document.createElement('button');

        addbtn(
            panel.kerning.content.btnnormal,
            {
                class: 'btn btn-outline px-3',
                background: 'white',
                border: 'black',
                font: '14px',
                text: '1.0',
                title: getMessage("KTK_SPECIAL__BTN_NORMAL")
            }
        );

        panel.kerning.content.btnnormal.addEventListener('click', function(e) {
            _this.send(par.events.kerningnormal, panel.kerning.content.btnnormal);
            panel.kerning.status.innerHTML = selectkerning();
        });

        addbtn(
            panel.kerning.content.btnmiddle,
            {
                class: 'btn btn-outline px-3',
                background: 'white',
                border: 'black',
                font: '14px',
                text: '1.5',
                title: getMessage("KTK_SPECIAL__BTN_MIDDLE"),
            }
        );

        panel.kerning.content.btnmiddle.addEventListener('click', function(e) {
            _this.send(par.events.kerningmiddle, panel.kerning.content.btnmiddle);
            panel.kerning.status.innerHTML = selectkerning();
        });

        addbtn(
            panel.kerning.content.btnbig,
            {
                class: 'btn btn-outline px-3',
                background: 'white',
                border: 'black',
                font: '14px',
                text: '2.0',
                title: getMessage("KTK_SPECIAL__BTN_BIG")
            }
        );

        panel.kerning.content.btnbig.addEventListener('click', function(e) {
            _this.send(par.events.kerningbig, panel.kerning.content.btnbig);
            panel.kerning.status.innerHTML = selectkerning();
        });

        panel.kerning.content.appendChild(panel.kerning.content.btnnormal);
        panel.kerning.content.appendChild(panel.kerning.content.btnmiddle);
        panel.kerning.content.appendChild(panel.kerning.content.btnbig);
        panel.kerning.appendChild(panel.kerning.content);
        panel.kerning.appendChild(panel.kerning.status);
        panel.appendChild(panel.kerning);
        // #endregion ===========================

        panel.interval = document.createElement('div');
        panel.interval.className = par.modifier.interval;
        panel.interval.name = document.createElement('div');
        panel.interval.name.classList.add('kegl-text', 'mb-2');
        panel.interval.name.style.color = 'rgba(0,0,0,0.87)';
        panel.interval.name.innerHTML = getMessage("KTK_SPECIAL__INTERVAL");;

        panel.interval.appendChild(panel.interval.name);

        panel.interval.content = document.createElement('div');
        panel.interval.status = document.createElement('div');
        panel.interval.content.classList.add('interval-content', 'btn-group');

        panel.interval.content.btnone = document.createElement('button');
        panel.interval.content.btnhalf = document.createElement('button');
        panel.interval.content.btntwo = document.createElement('button');

        addbtn(
            panel.interval.content.btnone,
            {
                class: 'btn btn-outline px-3',
                background: 'white',
                border: 'black',
                font: '14px',
                text: '1.0',
                title: getMessage("KTK_SPECIAL__BTN_ONE"),
            }
        );

        panel.interval.content.btnone.addEventListener('click', function(e) {
            _this.send(par.events.intervalone, panel.interval.content.btnone);
            panel.interval.status.innerHTML = selectinterval();
        });

        addbtn(
            panel.interval.content.btnhalf,
            {
                class: 'btn btn-outline px-3',
                background: 'white',
                border: 'black',
                font: '14px',
                text: '1.5',
                title: getMessage("KTK_SPECIAL__BTN_HALF"),
            }
        );

        panel.interval.content.btnhalf.addEventListener('click', function(e) {
            _this.send(par.events.intervalhalf, panel.interval.content.btnhalf);
            panel.interval.status.innerHTML = selectinterval();
        });

        addbtn(
            panel.interval.content.btntwo,
            {
                class: 'btn btn-outline px-3',
                background: 'white',
                border: 'black',
                font: '14px',
                text: '2.0',
                title: getMessage("KTK_SPECIAL__BTN_TWO"),
            }
        );

        panel.interval.content.btntwo.addEventListener('click', function(e) {
            _this.send(par.events.intervaltwo, panel.interval.content.btntwo);
            panel.interval.status.innerHTML = selectinterval();
        });

        panel.interval.status.classList.add('status-text', 'mt-2');
        panel.interval.status.style.color = 'rgba(0,0,0, 0.87)';
        panel.interval.status.innerHTML = selectinterval();

        panel.interval.content.appendChild(panel.interval.content.btnone);
        panel.interval.content.appendChild(panel.interval.content.btnhalf);
        panel.interval.content.appendChild(panel.interval.content.btntwo);
        panel.interval.appendChild(panel.interval.content);
        panel.interval.appendChild(panel.interval.status);
        panel.appendChild(panel.interval);

        // =================================

        panel.color = document.createElement('div');

        panel.color.className = par.modifier.color;

        panel.color.name = document.createElement('div');
        panel.color.name.classList.add('color-text', 'mb-2');
        panel.color.name.style.color = 'rgba(0,0,0,0.87)';
        panel.color.name.innerHTML = getMessage("KTK_SPECIAL__COLOR");

        panel.color.appendChild(panel.color.name);

        panel.color.content = document.createElement('div');
        panel.color.status = document.createElement('div');

        panel.color.content.classList.add('color-content', 'btn-group');


        panel.color.status.classList.add('status-text', 'mt-2');
        panel.color.status.style.color = 'rgba(0,0,0, 0.87)';

        panel.color.status.innerHTML = selectcolor() + getMessage("KTK_SPECIAL__SCHEMA");

        // #region Кнопки управления цветовой схемой

        panel.color.content.btnwhite = document.createElement('button');
        panel.color.content.btnblack = document.createElement('button');
        panel.color.content.btnyellow = document.createElement('button');
        panel.color.content.btnblue = document.createElement('button');
        panel.color.content.btngreen = document.createElement('button');

        addbtn(
            panel.color.content.btnwhite,
            {
                class: 'btn btn-outline px-2',
                background: 'white',
                border: 'black',
                font: '14px',
                text: 'C',
                title: getMessage("KTK_SPECIAL__BTN_WHITE"),
            }
        );

        panel.color.content.btnwhite.addEventListener('click', function(e) {
            if(_this.cookies.get('specialcolor') != par.events.colorwhite) {
                _this.send(par.events.colorwhite, e.target);
                panel.color.status.innerHTML = selectcolor() + getMessage("KTK_SPECIAL__SCHEMA");
            }
        });

        addbtn(
            panel.color.content.btnblack,
            {
                class: 'btn btn-outline px-2',
                background: 'black',
                border: 'white',
                font: '14px',
                text: 'C',
                title: getMessage("KTK_SPECIAL__BTN_BLACK"),
            }
        );

        panel.color.content.btnblack.addEventListener('click', function(e) {
            if(_this.cookies.get('specialcolor') != par.events.colorblack) {
                _this.send(par.events.colorblack, e.target);
                panel.color.status.innerHTML = selectcolor() + getMessage("KTK_SPECIAL__SCHEMA");
            }
        });

        addbtn(
            panel.color.content.btnyellow,
            {
                class: 'btn btn-outline px-2',
                background: '#FF0',
                border: 'black',
                font: '14px',
                text: 'C',
                title: getMessage("KTK_SPECIAL__BTN_YELLOW"),
            }
        );

        panel.color.content.btnyellow.addEventListener('click', function(e) {
            if(_this.cookies.get('specialcolor') != par.events.coloryellow) {
                _this.send(par.events.coloryellow, e.target);
                panel.color.status.innerHTML = selectcolor() + getMessage("KTK_SPECIAL__SCHEMA");
            }
        });

        addbtn(
            panel.color.content.btnblue,
            {
                class: 'btn btn-outline px-2',
                background: '#9fd7ff',
                border: 'black',
                font: '14px',
                text: 'C',
                title: getMessage("KTK_SPECIAL__BTN_BLUE"),
            }
        );
        panel.color.content.btnblue.addEventListener('click', function(e) {
            if(_this.cookies.get('specialcolor') != par.events.colorblue) {
                _this.send(par.events.colorblue, e.target);
                panel.color.status.innerHTML = selectcolor() + getMessage("KTK_SPECIAL__SCHEMA");
            }
        });
        addbtn(
            panel.color.content.btngreen,
            {
                class: 'btn btn-outline px-2',
                background: 'black',
                border: '#a9dd38',
                font: '14px',
                text: 'C',
                title: getMessage("KTK_SPECIAL__BTN_GREEN"),
            }
        );

        panel.color.content.btngreen.addEventListener('click', function(e) {
            if(_this.cookies.get('specialcolor') != par.events.colorgreen) {
                _this.send(par.events.colorgreen, e.target);
                panel.color.status.innerHTML = selectcolor() + getMessage("KTK_SPECIAL__SCHEMA");
            }
        });

        panel.color.content.appendChild(panel.color.content.btnwhite);
        panel.color.content.appendChild(panel.color.content.btnblack);
        panel.color.content.appendChild(panel.color.content.btnyellow);
        panel.color.content.appendChild(panel.color.content.btnblue);
        panel.color.content.appendChild(panel.color.content.btngreen);

        // #endregion


        panel.color.appendChild(panel.color.content);
        panel.color.appendChild(panel.color.status);
        panel.appendChild(panel.color);

        // #region Image =================================
        panel.img = document.createElement('div');

        panel.img.className = par.modifier.img;

        panel.img.name = document.createElement('div');
        panel.img.name.classList.add('color-text', 'mb-2');
        panel.img.name.style.color = 'rgba(0,0,0,0.87)';
        panel.img.name.innerHTML = getMessage("KTK_SPECIAL__IMG");

        panel.img.appendChild(panel.img.name);

        panel.img.content = document.createElement('div');

        panel.img.status = document.createElement('div');
        panel.img.status.classList.add('status-text', 'mt-2');
        panel.img.status.style.color = 'rgba(0,0,0,0.87)';

        panel.img.status.innerHTML = selectimg();


        panel.img.content.classList.add('img-content', 'btn-group');

        panel.img.content.btnoff = document.createElement('button');
        panel.img.content.btnbw = document.createElement('button');
        panel.img.content.btncolor = document.createElement('button');

        addbtn(
            panel.img.content.btnoff,
            {
                class: 'btn btn-outline px-3',
                background: 'white',
                border: 'black',
                font: '14px',
                text: getMessage("KTK_SPECIAL__BTN_OFF_TEXT"),
                title: getMessage("KTK_SPECIAL__BTN_OFF"),
            }
        );
        panel.img.content.btnoff.addEventListener('click', function(e) {
            _this.send(par.events.imageoff, panel.img.content.btnoff);
            panel.img.status.innerHTML = selectimg();
            changeStateAlt('off');
        });
        addbtn(
            panel.img.content.btnbw,
            {
                class: 'btn btn-outline px-3',
                background: 'white',
                border: 'black',
                font: '14px',
                text: getMessage("KTK_SPECIAL__BTN_BW_TEXT"),
                title: getMessage("KTK_SPECIAL__IMG_BTN_BW"),
            }
        );
        panel.img.content.btnbw.addEventListener('click', function(e) {
            _this.send(par.events.imageblack, panel.img.content.btnbw);
            panel.img.status.innerHTML = selectimg();
            changeStateAlt('onblack');
        });
        addbtn(
            panel.img.content.btncolor,
            {
                class: 'btn btn-outline px-3',
                background: 'white',
                border: 'black',
                font: '14px',
                text: getMessage("KTK_SPECIAL__IMG_BTN_COLOR_TEXT"),
                title: getMessage("KTK_SPECIAL__IMG_BTN_COLOR"),
            }
        );
        panel.img.content.btncolor.addEventListener('click', function(e) {
            _this.send(par.events.imagecolor, panel.img.content.btncolor);
            panel.img.status.innerHTML = selectimg();
            changeStateAlt('oncolor');
        });
        panel.img.content.appendChild(panel.img.content.btnoff);
        panel.img.content.appendChild(panel.img.content.btnbw);
        panel.img.content.appendChild(panel.img.content.btncolor);


        panel.img.appendChild(panel.img.content);
        panel.img.appendChild(panel.img.status);
        panel.appendChild(panel.img);

        // =================================

        /*
            sound: {
                name: {},
                content: {
                    btnon:{},
                    btnoff: {},
                },
                status: {},
            },
        */
        /*if(_this.getproperty('special_speech') == 'Y') {

            panel.sound = document.createElement('div');
            panel.sound.className = par.modifier.sound;

            // ========== name
            panel.sound.name = document.createElement('div');
            panel.sound.name.classList.add('sound-text', 'mb-2')
            panel.sound.name.style.color = 'rgba(0,0,0,0.87)';
            panel.sound.name.innerHTML = 'Звук';

            panel.sound.appendChild(panel.sound.name);
            // ===========
            panel.sound.content = document.createElement('div');
            panel.sound.content.classList.add('sound-content', 'btn-group');
            panel.sound.content.btnon = document.createElement('button');
            panel.sound.content.btnoff = document.createElement('button');

            addbtn(
                panel.sound.content.btnon,
                {
                    class: 'btn btn-outline px-3',
                    background: 'white',
                    border: 'black',
                    font: '14px',
                    text: 'Вкл',
                    title: "Включить озвучивание текста",
                }
            );

            panel.sound.content.btnon.addEventListener('click', function(e) {
                _this.send(par.events.soundon, panel);
                panel.sound.status.innerHTML = selectsound();
            });

            addbtn(
                panel.sound.content.btnoff,
                {
                    class: 'btn btn-outline px-3',
                    background: 'white',
                    border: 'black',
                    font: '14px',
                    text: 'Выкл',
                    title: "Выключить озвучивание текста",
                }
            );

            panel.sound.content.btnoff.addEventListener('click', function(e) {
                _this.send(par.events.soundoff, panel);
                panel.sound.status.innerHTML = selectsound();
            });

            // ===========
            panel.sound.status = document.createElement('div');
            panel.sound.status.classList.add('status-text', 'mt-2');
            panel.sound.status.style.color = 'rgba(0,0,0,0.87)';
            panel.sound.status.innerHTML = selectsound();
            // ===========

            panel.sound.content.appendChild(panel.sound.content.btnon);
            panel.sound.content.appendChild(panel.sound.content.btnoff);

            panel.sound.appendChild(panel.sound.content);
            panel.sound.appendChild(panel.sound.status);
            panel.appendChild(panel.sound);

            this.includeScript(par.modifier.specialsoundscript);
        }*/



        // =================================

        panel.onoff = document.createElement('div');

        panel.onoff.className = par.modifier.onoff;

        panel.onoff.name = document.createElement('div');
        panel.onoff.name.classList.add('onoff-text', 'mb-2');
        panel.onoff.name.style.color = 'rgba(0,0,0,0.87)';
        panel.onoff.name.innerHTML = getMessage("KTK_SPECIAL__PANEL");

        panel.onoff.appendChild(panel.onoff.name);

        panel.onoff.content = document.createElement('div');
        panel.onoff.content.classList.add('onoff-content', 'btn-group');

        panel.onoff.content.btnup = document.createElement('button');
        panel.onoff.content.btndefault = document.createElement('button');
        panel.onoff.content.btnonoff = document.createElement('button');


        addbtn(
            panel.onoff.content.btndefault,
            {
                class: 'btn btn-outline px-3',
                background: 'white',
                border: 'black',
                font: '14px',
                text: '<i class="fas fa-sync-alt" style="color:black!important"></i>',
                title: getMessage("KTK_SPECIAL__BTN_DEFAULT"),
            }
        );

        panel.onoff.content.btndefault.addEventListener('click', function(e) {
            _this.send(par.events.defaultsetting, panel);
        });

        addbtn(
            panel.onoff.content.btnonoff,
            {
                class: 'btn btn-outline px-3',
                background: 'white',
                border: 'black',
                font: '14px',
                text: getMessage("KTK_SPECIAL__BTN_OFF_TEXT"),
                title: getMessage("KTK_SPECIAL__BTN_OFF"),
            }
        );

        panel.onoff.content.btnonoff.addEventListener('click', function(e) {
            _this.send(par.events.close, panel);
            _this.send(par.events.defaultsetting, panel);
            changeStateAlt('onblack');
        });

        addbtn(
            panel.onoff.content.btnup,
            {
                class: 'btn btn-outline px-3',
                background: 'white',
                border: 'black',
                font: '14px',
                text: '<i class="far fa-angle-up" style="color:black!important"></i>',
                title: getMessage("KTK_SPECIAL__BTN_UP"),
            }
        )

        panel.onoff.content.btnup.style.position = 'absolute';
        panel.onoff.content.btnup.style.bottom = '0';
        panel.onoff.content.btnup.style.left = '0';
        panel.onoff.content.btnup.style.borderBottom = '0 solid black';
        panel.onoff.content.btnup.style.borderRadius = '0';
        panel.onoff.content.btnup.style.zIndex = '10';

        if(_this.cookies.get('specialup') == 'down') {
            panel.style.marginTop = '-' + panel.clientHeight + 'px';
            panel.onoff.content.btnup.style.bottom = '-' + panel.onoff.content.btnup.clientHeight + 'px';
            panel.onoff.content.btnup.style.transform = 'rotate(180deg)';
            _this.cookies.set('specialup', 'up', 7);
        } else {
            panel.style.marginTop = '0';
            panel.onoff.content.btnup.style.bottom = '0';
            panel.onoff.content.btnup.style.transform = 'rotate(0deg)';
            _this.cookies.set('specialup', 'down', 7);
        }

        panel.onoff.content.btnup.addEventListener('click', function(e) {
            _this.send(par.events.up, panel);
        });

        panel.onoff.content.appendChild(panel.onoff.content.btndefault);
        panel.onoff.content.appendChild(panel.onoff.content.btnonoff);

        panel.onoff.appendChild(panel.onoff.content);
        panel.appendChild(panel.onoff);
        panel.appendChild(panel.onoff.content.btnup);

        // #endregion =================================

        return panel;
    }

    // #endregion Panel Special

    /**
     *
     * @param {*} e
     */
    this.modal = function(e) {
        var overlay = {
                load: {},
                area: {
                    content: {},
                    close: {},
                },
            },
            _this = this,
            par = e.target.params,
            page = document.body.querySelector('.ktk-pagewrap-area'),
            el = e.target;

        overlay = document.createElement('div');
        overlay.load = document.createElement('div');
        overlay.load.innerHTML = par.load;
        overlay.area = document.createElement('div');
        overlay.area.content = document.createElement('div');
        overlay.area.close = document.createElement('button');

        overlay.load.setAttribute(par.attributes.load, '');
        overlay.className = par.modifier.overlay;
        overlay.style.display = 'flex';
        overlay.load.style.position = 'fixed';
        overlay.load.style.top = '0';
        overlay.load.style.left = '0';
        overlay.load.style.width = '100%';
        overlay.setAttribute(par.attributes.overlay, '');

        overlay.addEventListener('click', function(e) {
            if(e.target.hasAttribute(par.attributes.overlay))
                _this.send(par.events.close, overlay);
        });

        overlay.classList = par.modifier.overlay;
        overlay.setAttribute(par.data.src, par.modifier.src);
        overlay.style.zIndex = this.topZIndex() + 1;

        overlay.area.setAttribute(par.attributes.modal, '');
        overlay.area.className = par.modifier.modal;
        overlay.area.content.setAttribute(par.attributes.content, '');
        overlay.area.content.className = par.modifier.content;
        overlay.area.style.opacity = '0';
        overlay.area.appendChild(overlay.area.content);

        overlay.area.close.addEventListener('click', function(e) {
            _this.send(par.events.close, overlay);
        });

        overlay.area.close.setAttribute(par.attributes.close, '');
        overlay.area.close.className = par.modifier.close;
        overlay.area.appendChild(overlay.area.close);
        overlay.appendChild(overlay.load);
        overlay.appendChild(overlay.area);

        // Событие происходит перед открытием окна
        this.receive(par.events.open, overlay, function(e) {
            overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            try {
                if(el.hasAttribute(par.data.blur) || (par.attributes.blur != null && par.attributes.blur != undefined)) {
                    //console.log(page)
                    if(page !== null && page !== undefined) {
                        //console.log(par.modifier.blur)
                        page.classList.add(par.modifier.blur.replace(" ", ''));
                    }
                }
            } catch(exp) {

            }


        });

        // Событие происходит перед закрытием окна
        this.receive(par.events.close, overlay, function(e) {
            if(overlay.parentNode != null) {
                overlay.area.style.opacity = '0';
                overlay.area.content.innerHTML = '';
                overlay.load.style.display = 'flex';
                overlay.parentNode.removeChild(overlay);
            }
            document.body.style.overflow = 'auto';
            try {
                if(el.hasAttribute(par.data.blur) || (par.attributes.blur != null && par.attributes.blur != undefined))
                    if(page !== null && page !== undefined)
                        page.classList.remove(par.modifier.blur.replace(" ", ""));
            } catch(exp) {

            }

        });

        return overlay;
    }

    this.iframe = function(e) {
        /*var overlay = {
            load: {},
            area: {
                content: {},
                close: {},
            },
        },
        _this = this,
        page= document.body.querySelector('.ktk-pagewrap-area'),
        el = e.target;*/
        var overlay = {
                load: {},
                area: {
                    content: {},
                    close: {},
                },
            },
            _this = this,
            par = e.target.params,
            page = document.body.querySelector('.ktk-pagewrap-area'),
            el = e.target;



        overlay = document.createElement('div');
        overlay.load = document.createElement('div');
        overlay.load.innerHTML = par.load;
        overlay.area = document.createElement('div');
        overlay.area.content = document.createElement('iframe');
        overlay.area.content.src = par.modifier.src;
        overlay.area.close = document.createElement('button');

        overlay.load.setAttribute(par.attributes.load, '');
        overlay.load.className = par.modifier.load;
        overlay.load.style.position = 'fixed';
        overlay.load.style.top = '0';
        overlay.load.style.left = '0';
        overlay.load.style.width = '100%';
        overlay.setAttribute(par.attributes.overlay, '');

        overlay.addEventListener('click', function(e) {
            if(e.target.hasAttribute(par.attributes.overlay))
                _this.send(par.events.close, overlay);
            /*console.log(par.attributes.overlay)
            if(el.hasAttribute(par.attributes.overlay)) {
                console.log(overlay)
                overlay.parenNode.removeChild(overlay);
                document.body.style.overflow = 'auto';
                if(el.hasAttribute(par.data.blur) || par.attributes.blur)
                    if(page !== null && page !== undefined)
                        page.classList.remove(par.modifier.opt);
            }*/
        });

        overlay.classList = par.modifier.overlay;
        overlay.setAttribute(par.data.src, par.modifier.src);
        overlay.style.zIndex = this.topZIndex() + 1;

        overlay.area.setAttribute(par.attributes.content, "");
        overlay.area.className = par.modifier.modal;
        overlay.area.content.setAttribute(par.attributes.content, "");
        overlay.area.content.className = par.modifier.content;
        overlay.area.style.opacity = "0";
        overlay.area.appendChild(overlay.area.content);

        /*overlay.area.close.addEventListener('click', function(e) {
            overlay.parenNode.removeChild(overlay);
            document.body.style.overflowY = 'auto';
            if(el.hasAttribute(par.data.blur) || par.attributes.blur)
                if(page !== null && page !== undefined)
                    page.classList.remove(par.modifier.blur);
         });*/

        overlay.area.close.addEventListener('click', function(e) {
            _this.send(par.events.close, overlay);
        });


        overlay.area.close.setAttribute(par.attributes.close, '');
        overlay.area.close.className = par.modifier.close;
        overlay.area.appendChild(overlay.area.close);
        overlay.appendChild(overlay.load);
        overlay.appendChild(overlay.area);

        this.receive(par.events.open, el || window, function(e) {
            overlay.style.opacity = 1;
            document.body.style.overflow = 'hidden';
            overlay.style.display = 'flex';
            if(el.hasAttribute(par.data.blur) || par.attributes.blur)
                if(page !== null && page !== undefined)
                    page.classList.add(par.modifier.blur);
        });

        this.receive(par.events.close, overlay, function(e) {
            if(overlay.parentNode != null) {
                overlay.area.style.opacity = '0';
                overlay.area.content.innerHTML = '';
                overlay.load.style.display = 'flex';
                overlay.parentNode.removeChild(overlay);
            }
            document.body.style.overflow = 'auto';
            if(el.hasAttribute(par.data.blur) || par.attributes.blur)
                if(page !== null && page !== undefined)
                    page.classList.add(par.modifier.blur);
        });

        /*if(el.hasAttribute(par.data.blur) || par.attributes.blur)
            if(page !== null && page !== undefined)
                page.classList.add(par.modifier.blur);*/

        this.send(par.events.open, el);
        return overlay;
    }

    this.providercreate = function(e) {
        var b = e.target.blocks,
            el = e.target,
            par = el.params;
        switch(b) {
            case 'modal':
                el.modal = this.modal(e);
                el.event = par.events.init;
                this.send("providerend", el);
                break;
            case "special":
                el.special = this.special(e);
                el.event = par.events.init;
                this.send('providerend', el);
                break;
            case 'ajaxload':
                el.event = par.events.init;
                this.send('providerend', el);
                break;
        }
    }

    var _this = this;

    if(this.stack.ev('providerstart')) {
        this.receive('providerstart', window, function(e) {
            _this.providercreate(e);
        });
        this.stack.events.push('providerstart');
    }

}
KTK.Modal = function(el, opt) {

    this.createNew = function(e) {
        var par = new KTK.Parameters(),
            modPar = par.newparams();
        window.blocks = 'modal';
        window.params = this.extend(modPar.blocks.modal, window.params);
        e.target.blocks = 'modal';
        e.target.params = this.extend(modPar.blocks.modal, window.params);
        e.target.modal = _this.modal(e);
        window.modal = _this.modal(e);
        _this.create(e);
    }

    this.create = function(e) {
        //console.log(e.target)
        var modal = e.target.modal,
            el = e.target,
            container = null,
            opt = el.params;

        try {
            if(el.hasAttribute(opt.data.iframe))
                modal = this.iframe(e);
        } catch(ex) {

        }


        //console.log(modal)

        var service = document.body.querySelector('.ktk-service-bottom-area');

        if(service == null || service == undefined) {
            service = document.createElement('div');
            service.classList.add(el.params.modifier.service);
            document.body.appendChild(service);
        } else container = service.querySelector('.ktk-modal-container');

        if(container == null || container == undefined) {
            container = document.createElement('section');
            container.setAttribute('modal-container', '');
            container.className = opt.modifier.container;
        }
        //console.log(container)
        try {
            container.appendChild(modal);
        } catch(ex) {
            container.innerHTML = modal;
        }

        service.appendChild(container);

        setTimeout(function() {
            if(modal.hasAttribute(el.params.data.src)) {
                var link = modal.getAttribute(el.params.data.src).replace(" ", '');

                function simbol(ch) {
                    var str = 'abcdefghijklmnopqrstuvwxyz',
                        i = 0;
                    for(var k = 0; k < str.length; k++)
                        if(str[k] == ch) i++;
                    if(i > 0) return true;
                    else return false;
                }
                if(link != null && link != '') {
                    if(link[0] == '.' && simbol(link[1])) {

                        modal.area.content.appendChild(document.body.querySelector(link).cloneNode(true));
                        _this.searchdata(modal.area.content);
                        modal.load.style.display = 'none';
                        modal.area.style.opacity = '1';
                        _this.send(el.params.events.open, modal);

                    } else if(link[0] == '#') {
                        modal.area.content.appendChild(document.body.querySelector(link).cloneNode(true));
                        _this.searchdata(modal.area.content);
                        modal.load.style.display = 'none';
                        modal.area.style.opacity = '1';
                        _this.send(el.params.events.open, modal);
                    } else if(link[0] == '[') {
                        modal.area.content.appendChild(document.body.querySelector(link).cloneNode(true));
                        _this.searchdata(modal.area.content);
                        modal.load.style.display = 'none';
                        modal.area.style.opacity = '1';
                        _this.send(el.params.events.open, modal);
                    } else {

                        BX.ajax.post(
                            modal.getAttribute(el.params.data.src),
                            '',
                            function (data) {
                                try {
                                    if(el.hasAttribute(opt.data.iframe)) {
                                        //modal.area.content.contentWindow.document.body.innerHTML = data;
                                    } else modal.area.content.innerHTML = data;
                                } catch(ex) {
                                    modal.area.content.innerHTML = data;
                                }

                                _this.searchdata(modal.area.content);
                                modal.load.style.display = 'none';
                                modal.area.style.opacity = '1';
                                _this.send(el.params.events.open, modal);
                            }
                        );
                    }
                } else {
                    modal.area.content.innerHTML = '<div class="w-100 h-100"><h6 class="c-red">Error</h6></div>';
                    _this.searchdata(modal.area.content);
                    modal.load.style.display = 'none';
                    modal.area.style.opacity = '1';
                    _this.send(el.params.events.open, modal);
                }
            }

        }, 1000);
    }

    // ====== CONSTRUCTOR ====== //

    KTK.Events.call(this)

    this.el = el;
    this.stack = stack;
    var _this = this,
        par = new KTK.Parameters(),
        param = par.newparams(),
        plugin = this.extend(param.blocks.modal, opt);

    if(this.el) {
        this.el.blocks = 'modal';
        this.el.params = plugin;
    }

    this.receive(plugin.events.init, window, function(e) {
        var ev = e;
        ev.target.addEventListener('click', function(e) {
            e.preventDefault();
            _this.create(ev);
        });
    });

    this.receive(plugin.events.create, window, function(e) {
        _this.createNew(e);
    });

    // Закрываем окно клавишей Escpe
    this.quickkey(function(e) {
        var overlay = _this.topZIndexElement(document.body.querySelectorAll('.ktk-modal-overlay'));
        _this.send('modalclose', overlay);
    }, 27);

    /*window.addEventListener('click', function(e) {
            if(e.target.hasAttribute('ktk-modal')) {
                if(e.target.params == undefined || e.target.params == null)
                    _this.send(plugin.events.create, e.target);
            }
        })*/

    KTK.Controller.call(this);

    // ====== END CONSTRUCTOR ====== //

}
KTK.Special = function(el, opt) {
    // #region Method
    this.updateparam = function(param) {
        for(var key in param)
            if(_this.cookies.get(key))
                param[key] = _this.cookies.get(key);
        return param;
    }
    // #endregion
    // ====== CONSTRUCTOR ====== //
    KTK.Events.call(this);
    //KTK.Property.call(this);

    this.el = el;
    var _this = this,
        par = new KTK.Parameters(),
        param = par.newparams(),
        plugin = this.extend(param.blocks.special, opt);

    this.stack = stack;
    var html = document.querySelector('html'),
        body = document.body,
        service = body.querySelector('.ktk-service-top-area');

    if(this.el) {
        this.el.blocks = 'special';
        this.el.params = plugin;
    }

    plugin.cookies = this.updateparam(plugin.cookies);

    // event button on panel
    // transition from special to normal view
    if(this.stack.ev(plugin.events.close)) {
        this.receive(plugin.events.close, window, function(e) {
            var panel = e.target;
            panel.parentNode.removeChild(panel);
            _this.el.linkcss.parentNode.removeChild(_this.el.linkcss);
            _this.send(plugin.events.soundoff, window);
            _this.cookies.set('specialstate', 'off', 7);
        });
        this.stack.events.push(plugin.events.close);
    }

    // event when click button "special view"
    // transition from normal to special state
    if(this.stack.ev(plugin.events.open)) {
        this.receive(plugin.events.open, window, function(e) {

            _this.cookies.set('specialstate', 'on', 7);
            _this.updateparam(plugin.cookies);
            service.insertBefore(_this.el.special, service.firstChild);
            html.classList.add('special');


            switch(plugin.cookies.specialfont) {
                case 'sans':
                    _this.send(plugin.events.fontsans, e.target);
                    break;
                case 'serif':
                    _this.send(plugin.events.fontserif, e.target);
                    break;
                case 'mono':
                    _this.send(plugin.events.fontmono, e.target);
                    break;
            }

            switch(plugin.cookies.specialkerning) {
                case 'normal':
                    _this.send(plugin.events.kerningnormal, e.target);
                    break;
                case 'middle':
                    _this.send(plugin.events.kerningmiddle, e.target);
                    break;
                case 'big':
                    _this.send(plugin.events.kerningbig, e.target);
                    break;
            }

            switch(plugin.cookies.specialinterval) {
                case '1.0':
                    _this.send(plugin.events.intervalone, e.target);
                    break;
                case '1.5':
                    _this.send(plugin.events.intervalhalf, e.target);
                    break;
                case '2.0':
                    _this.send(plugin.events.intervaltwo, e.target);
                    break;
            }
            html.style.fontSize = plugin.cookies.specialkegl + 'px';
            body.style.fontSize = plugin.cookies.specialkegl + 'px';
            switch(plugin.cookies.specialimage) {
                case 'off':
                    html.classList.add('special-img-none');
                    html.classList.remove('special-img-black');
                    _this.cookies.set('specialimage', 'off', 7);
                    break;
                case 'oncolor':
                    html.classList.remove('special-img-none');
                    html.classList.remove('special-img-black');
                    _this.cookies.set('specialimage', 'oncolor', 7);
                    break;
                case 'onblack':
                    html.classList.add('special-img-black');
                    html.classList.remove('special-img-none');
                    _this.cookies.set('specialimage', 'onblack', 7);
                    break;
            }
            _this.el.linkcss = _this.addcss(plugin.modifier[plugin.cookies.specialcolor]);

            var stateImage = _this.cookies.get('specialimage');
            if(stateImage == 'off')
            {
                document.querySelectorAll('.ktk-special-hidden').forEach((elem) => {
                    elem.classList.remove('ktk-special-hidden');
                    elem.classList.add('ktk-special-show')
                });

                // hide static images and creating div to display alt text
                document.querySelectorAll('main img').forEach((elem) => {
                    elem.classList.remove('ktk-special-show');
                    elem.classList.add('ktk-special-hidden');
                    var myAltText = document.createElement('div');
                    myAltText.classList.add('ktk-special-show');
                    myAltText.classList.add('ktk-special-alt-text');
                    myAltText.classList.add('t-center');
                    myAltText.innerText = elem.alt;
                    elem.parentNode.insertBefore(myAltText, elem);
                });
            }
            else if(stateImage == 'onblack' || stateImage == 'oncolor')
            {
                document.querySelectorAll('.ktk-special-show').forEach((elem) => {
                    elem.classList.add('ktk-special-hidden');
                    elem.classList.remove('ktk-special-show');
                });

                // show static images
                document.querySelectorAll('main img').forEach((elem) => {
                    elem.classList.remove('ktk-special-hidden');
                    elem.classList.add('ktk-special-show')
                });

                // delete div with alt text
                document.querySelectorAll('.ktk-special-alt-text').forEach((elem) => {
                    elem.remove();
                });
            }



            var panel = document.body.querySelector('[ktk-special-panel]');
            if(plugin.cookies.specialsound == 'on')
                _this.send(plugin.events.soundon, panel);
            //_this.send(plugin.events.up, panel);
        });
        this.stack.events.push(plugin.events.open);
    }

    // #region Font

    if(this.stack.ev(plugin.events.fontsans)) {
        this.receive(plugin.events.fontsans, window, function(e) {
            html.classList.add('special-font-sans');
            html.classList.remove('special-font-serif');
            html.classList.remove('special-font-mono');
            _this.cookies.set('specialfont', 'sans', 7);
        });
        this.stack.events.push(plugin.events.fontsans);
    }

    if(this.stack.ev(plugin.events.fontserif)) {
        this.receive(plugin.events.fontserif, window, function(e) {
            html.classList.remove('special-font-sans');
            html.classList.add('special-font-serif');
            html.classList.remove('special-font-mono');
            _this.cookies.set('specialfont', 'serif', 7);
        });
        this.stack.events.push(plugin.events.fontserif);
    }

    if(this.stack.ev(plugin.events.fontmono)) {
        this.receive(plugin.events.fontmono, window, function(e) {
            html.classList.remove('special-font-sans');
            html.classList.remove('special-font-serif');
            html.classList.add('special-font-mono');
            _this.cookies.set('specialfont', 'mono', 7);
        });
        this.stack.events.push(plugin.events.fontmono);
    }

    // #endregion Font

    if(this.stack.ev(plugin.events.keglless)) {
        this.receive(plugin.events.keglless, window, function(e) {
            _this.updateparam(plugin.cookies);
            if(plugin.cookies.specialkegl < 24) {
                var kegl = Number(plugin.cookies.specialkegl);
                kegl++;
                html.style.fontSize = kegl + 'px';
                body.style.fontSize = kegl + 'px';
                _this.cookies.set('specialkegl', kegl, 7);
            }
        });
        this.stack.events.push(plugin.events.keglless);
    }

    if(this.stack.ev(plugin.events.keglmore)) {
        this.receive(plugin.events.keglmore, window, function(e) {
            _this.updateparam(plugin.cookies);
            if(plugin.cookies.specialkegl > 14) {
                var kegl = Number(plugin.cookies.specialkegl);
                kegl--;
                html.style.fontSize = kegl + 'px';
                body.style.fontSize = kegl + 'px';
                _this.cookies.set('specialkegl', kegl, 7);
            }
        });
        this.stack.events.push(plugin.events.keglmore);
    }

    // Kerning
    if(this.stack.ev(plugin.events.kerningnormal)) {
        this.receive(plugin.events.kerningnormal, window, function(e) {
            _this.updateparam(plugin.cookies);
            html.classList.remove('special-kerning-middle');
            html.classList.remove('special-kerning-big');
            _this.cookies.set('specialkerning', 'normal', 7);
        });
        this.stack.events.push(plugin.events.kerningnormal);
    }
    //
    if(this.stack.ev(plugin.events.kerningmiddle)) {
        this.receive(plugin.events.kerningmiddle, window, function(e) {
            _this.updateparam(plugin.cookies);
            html.classList.add('special-kerning-middle');
            html.classList.remove('special-kerning-big');
            _this.cookies.set('specialkerning', 'middle', 7);
        });
        this.stack.events.push(plugin.events.kerningmiddle);
    }
    if(this.stack.ev(plugin.events.kerningbig)) {
        this.receive(plugin.events.kerningbig, window, function(e) {
            _this.updateparam(plugin.cookies);
            html.classList.remove('special-kerning-middle');
            html.classList.add('special-kerning-big');
            _this.cookies.set('specialkerning', 'big', 7);
        });
        this.stack.events.push(plugin.events.kerningbig);
    }
    //===========

    // Interval Увеличение интервала текста
    if(this.stack.ev(plugin.events.intervalone)) {
        this.receive(plugin.events.intervalone, window, function(e) {
            _this.updateparam(plugin.cookies);
            html.classList.remove('special-interval-15');
            html.classList.remove('special-inerval-20');
            _this.cookies.set('specialinterval', '1', 7);
        });
        this.stack.events.push(plugin.events.intervalone);
    }

    if(this.stack.ev(plugin.events.intervalhalf)) {
        this.receive(plugin.events.intervalhalf, window, function(e) {
            _this.updateparam(plugin.cookies);
            html.classList.add('special-interval-15');
            html.classList.remove('special-inerval-20');
            _this.cookies.set('specialinterval', '1.5', 7);
        });
        this.stack.events.push(plugin.events.intervalhalf);
    }

    if(this.stack.ev(plugin.events.intervaltwo)) {
        this.receive(plugin.events.intervaltwo, window, function(e) {
            _this.updateparam(plugin.cookies);
            html.classList.remove('special-interval-15');
            html.classList.add('special-inerval-20');
            _this.cookies.set('specialinterval', '2.0', 7);
        });
        this.stack.events.push(plugin.events.intervaltwo);
    }
    // =======================================================
    if(this.stack.ev(plugin.events.imagecolor)) {
        this.receive(plugin.events.imagecolor, window, function(e) {
            _this.updateparam(plugin.cookies);
            html.classList.remove('special-img-none');
            html.classList.remove('special-img-black');
            _this.cookies.set('specialimage', 'oncolor', 7);
        });
        this.stack.events.push(plugin.events.imagecolor);
    }

    if(this.stack.ev(plugin.events.imageblack)) {
        this.receive(plugin.events.imageblack, window, function(e) {
            _this.updateparam(plugin.cookies);
            html.classList.remove('special-img-none');
            html.classList.add('special-img-black');
            _this.cookies.set('specialimage', 'onblack', 7);
        });
        this.stack.events.push(plugin.events.imageblack);
    }

    if(this.stack.ev(plugin.events.imageoff)) {
        this.receive(plugin.events.imageoff, window, function(e) {
            _this.updateparam(plugin.cookies);
            html.classList.add('special-img-none');
            html.classList.remove('special-img-black');
            _this.cookies.set('specialimage', 'off', 7);
        });
        this.stack.events.push(plugin.events.imageoff);
    }


    // ============================================

    if(this.stack.ev(plugin.events.colorwhite)) {
        this.receive(plugin.events.colorwhite, window, function(e) {
            _this.updateparam(plugin.cookies);
            service.insertBefore(_this.el.special, service.firstChild);
            html.classList.add('special');
            _this.el.linkcss.parentNode.removeChild(_this.el.linkcss);
            _this.el.linkcss = _this.addcss(plugin.modifier.specialwhite);
            _this.cookies.set('specialcolor', 'specialwhite', 7);
        });
        this.stack.events.push(plugin.events.colorwhite);
    }

    if(this.stack.ev(plugin.events.colorblack)) {
        this.receive(plugin.events.colorblack, window, function(e) {
            //var service = document.body.querySelector('.ktk-service-top-area');
            service.insertBefore(_this.el.special, service.firstChild);
            html.classList.add('special');
            _this.el.linkcss.parentNode.removeChild(_this.el.linkcss);
            _this.el.linkcss = _this.addcss(plugin.modifier.specialblack);
            _this.cookies.set('specialcolor', 'specialblack', 7);
        });
        this.stack.events.push(plugin.events.colorblack);
    }

    if(this.stack.ev(plugin.events.coloryellow)) {
        this.receive(plugin.events.coloryellow, window, function(e) {
            //var service = document.body.querySelector('.ktk-service-top-area');
            service.insertBefore(_this.el.special, service.firstChild);
            html.classList.add('special');
            _this.el.linkcss.parentNode.removeChild(_this.el.linkcss);
            _this.el.linkcss = _this.addcss(plugin.modifier.specialyellow);
            _this.cookies.set('specialcolor', 'specialyellow', 7);
        });
        this.stack.events.push(plugin.events.coloryellow);
    }

    if(this.stack.ev(plugin.events.colorblue)) {
        this.receive(plugin.events.colorblue, window, function(e) {
            //var service = document.body.querySelector('.ktk-service-top-area');
            service.insertBefore(_this.el.special, service.firstChild);
            html.classList.add('special');
            _this.el.linkcss.parentNode.removeChild(_this.el.linkcss);
            _this.el.linkcss = _this.addcss(plugin.modifier.specialblue);
            _this.cookies.set('specialcolor', 'specialblue', 7);
        });
        this.stack.events.push(plugin.events.colorblue);
    }

    if(this.stack.ev(plugin.events.colorgreen)) {
        this.receive(plugin.events.colorgreen, window, function(e) {
            service.insertBefore(_this.el.special, service.firstChild);
            html.classList.add('special');
            _this.el.linkcss.parentNode.removeChild(_this.el.linkcss);
            _this.el.linkcss = _this.addcss(plugin.modifier.specialgreen);
            _this.cookies.set('specialcolor', 'specialgreen', 7);
        });
        this.stack.events.push(plugin.events.colorgreen);
    }


    if(this.stack.ev(plugin.events.soundoff)) {
        this.receive(plugin.events.soundoff, window, function(e) {
            var btnplay = document.body.querySelectorAll('[ktk-play]');
            for(var k = 0; k < btnplay.length; k++)
                btnplay[k].parentNode.removeChild(btnplay[k]);
            _this.cookies.set('specialsound', 'off', 7);
        });
        this.stack.events.push(plugin.events.soundoff);
    }
    // end Sound

    if(this.stack.ev(plugin.events.defaultsetting)) {
        this.receive(plugin.events.defaultsetting, window, function(e) {
            var o  = new KTK.Parameters().newparams(),
                p = o.blocks.special,
                panel = e.target;

            html.classList.remove('special-font-sans');
            html.classList.remove('special-font-serif');
            html.classList.remove('special-font-mono');
            panel.font.status.innerHTML = getMessage("KTK_SPECIAL__FONT_DEFAULT");

            _this.cookies.set('specialfont', p.cookies.specialfont, 7);

            html.style.fontSize = p.cookies.specialkegl + 'px';
            panel.kegl.status.innerHTML = p.cookies.specialkegl + getMessage("KTK_SPECIAL__SPECIAL_KEGL");
            _this.cookies.set('specialkegl', p.cookies.specialkegl, 7);

            html.classList.remove('special-kerning-middle');
            html.classList.remove('special-kerning-big');
            _this.cookies.set('specialkerning', p.cookies.specialkerning, 7);
            panel.kerning.status.innerHTML = getMessage("KTK_SPECIAL__KERNING_NORMAL");

            html.classList.remove('special-interval-15');
            html.classList.remove('special-inerval-20');
            _this.cookies.set('specialinterval', '1.0', 7);
            panel.interval.status.innerHTML = getMessage("KTK_SPECIAL__INTERVAL_1_0");

            if( _this.el.linkcss.parentNode) {
                _this.el.linkcss.parentNode.removeChild(_this.el.linkcss);
            }

            _this.el.linkcss = _this.addcss(p.modifier.specialwhite);
            _this.cookies.set('specialcolor', p.cookies.specialcolor);

            panel.color.status.innerHTML = getMessage("KTK_SPECIAL__BTN_WHITE");

            panel.img.status.innerHTML = getMessage("KTK_SPECIAL__IMG_ON_COLOR");
            html.classList.remove('special-img-none');
            html.classList.remove('special-img-black');
            _this.cookies.set('specialimage', 'on', 7);
        });
        this.stack.events.push(plugin.events.defaultsetting);
    }

    if(this.stack.ev(plugin.events.up)) {
        this.receive(plugin.events.up, window, function(e) {
            var panel = e.target;
            if(_this.cookies.get('specialup') == 'down') {
                panel.style.marginTop = '-' + panel.clientHeight + 'px';
                panel.onoff.content.btnup.style.bottom = '-' + panel.onoff.content.btnup.clientHeight + 'px';
                panel.onoff.content.btnup.style.transform = 'rotate(180deg)';
                _this.cookies.set('specialup', 'up', 7);
            } else {
                panel.style.marginTop = '0';
                panel.onoff.content.btnup.style.bottom = '0';
                panel.onoff.content.btnup.style.transform = 'rotate(0deg)';
                _this.cookies.set('specialup', 'down', 7);
            }
        });
        this.stack.events.push(plugin.events.up);
    }

    // ============================================

    // events on first page load
    // events also trigger depending first state
    // if plugin was disable
    if(plugin.cookies.specialstate == 'off') {
        _this.el.addEventListener('click', function(e) {
            e.preventDefault();
            switch(_this.cookies.get('specialstate')) {
                // trigger when plugin was disable and enable special view
                case 'off':
                    _this.send(_this.el.params.events.open, _this.el);
                    document.querySelectorAll('.ktk-special-hidden').forEach((elem) => {
                        elem.classList.remove('ktk-special-hidden');
                        elem.classList.add('ktk-special-show')
                    });
                    break;
                // trigger when plugin was disable and disable special view
                case 'on':
                    var panel = document.body.querySelector('[ktk-special-panel]');
                    panel.parentNode.removeChild(panel);
                    _this.el.linkcss.parentNode.removeChild(_this.el.linkcss);
                    _this.cookies.set('specialstate', 'off', 7);
                    document.querySelectorAll('.ktk-special-show').forEach((elem) => {
                        elem.classList.add('ktk-special-hidden');
                        elem.classList.remove('ktk-special-show');
                    });
                    // delete div with alt text
                    showStaticImages();
                    deleteSpecialAltText();
                    break;
                default:
                    _this.send(_this.el.params.events.open, _this.el);
                    break;
            }
        });
    }
    // if plugin was enable
    else {
        _this.updateparam(plugin.cookies);
        _this.send(plugin.events.open, window);
        _this.el.addEventListener('click', function(e) {
            switch(_this.cookies.get('specialstate')) {
                // trigger when plugin was enable and enable special view
                case 'off':
                    _this.send(_this.el.params.events.open, _this.el);
                    document.querySelectorAll('.ktk-special-hidden').forEach((elem) => {
                        elem.classList.remove('ktk-special-hidden');
                        elem.classList.add('ktk-special-show')
                    });
                    break;
                // trigger when plugin was enable and disable special view
                case 'on':
                    var panel = document.body.querySelector('[ktk-special-panel]');
                    panel.parentNode.removeChild(panel);
                    _this.el.linkcss.parentNode.removeChild(_this.el.linkcss);
                    _this.cookies.set('specialstate', 'off', 7);
                    document.querySelectorAll('.ktk-special-show').forEach((elem) => {
                        elem.classList.add('ktk-special-hidden');
                        elem.classList.remove('ktk-special-show');
                    });
                    showStaticImages();
                    deleteSpecialAltText();
                    break;
                default:
                    _this.send(_this.el.params.events.open, _this.el);
                    break;
            }
        });
    }

    function deleteSpecialAltText()
    {
        document.querySelectorAll('.ktk-special-alt-text').forEach((elem) => {
            elem.remove();
        });
    }

    function showStaticImages()
    {
        document.querySelectorAll('main img').forEach((elem) => {
            elem.classList.remove('ktk-special-hidden');
            elem.classList.add('ktk-special-show')
        });
    }


    // ====== END CONSTRUCTOR ====== //
}
KTK.AjaxLoad = function(el, opt) {

    KTK.Events.call(this);

    this.el = el;
    var _this = this,
        par = new KTK.Parameters(),
        param = par.newparams(),
        plugin = this.extend(param.blocks.ajaxload, opt);

    this.stack = stack;

    if(this.el) {
        this.el.blocks = 'ajaxload';
        this.el.params = plugin;
    }

    this.receive(plugin.events.init, window, function(e) {
        var el = e.target,
            interval = setInterval(_this.checklayer, 1000, el);
        _this.receive(plugin.events.cancel, el, function(e) {
            clearInterval(interval);
        })
    })

    this.receive(plugin.events.create, window, function(e) {
        _this.send('ajaxloadinit', e.target);
    })

    this.checklayer = function(el) {
        var comp = getComputedStyle(el);

        if(el.getAttribute(plugin.data.loaded) !== 'loaded' && comp.display !== 'none') {
            el.setAttribute(plugin.data.loaded, 'loaded');
            el.innerHTML = plugin.load;
            setTimeout(function(){
                BX.ajax.post(
                    el.getAttribute(plugin.data.src),
                    '',
                    function (data) {
                        el.innerHTML = data;
                        el.load.style.display = 'none';
                    }
                );
            }, 1000);

        } else el.setAttribute(plugin.data.loaded, '');

        if(el.hasAttribute(plugin.data.cancel) && el.getAttribute(plugin.data.loaded) == 'loaded')
            _this.send(plugin.events.cancel, el);
    }
}
KTK.Controller.Stack = {
    el: [],
    events: [],
    log: [],
}

var stack = KTK.Controller.Stack;

KTK.Controller.Stack.extend = function(def, options) {
    var i = 0;
    for(var key in options) {
        if(def.length > 0)
            for(var k = 0; k < def.length; k++)
                if(def[k] == options[key]) i++;
        if(i == 0) def.push(options[key]);
        i = 0;
    }
    return def;
}


KTK.Controller.Stack.addevents = function(events) {
    var e = this.stack.events,
        i = 0;
    for(var k = 0; k < e.length; k++)
        if(e[k] == events) i++;
    if(i == 0) e.push(events);
}

KTK.Controller.Stack.ev = function(ev) {
    var e = this.events,
        i = 0;
    for(var k = 0; k < e.length; k++)
        if(e[k] == ev) i++;
    if(i === 0) return true;
    else return false;
}
window.addEventListener('DOMContentLoaded', function(e) {
    new KTK.AjaxLoad();
    new KTK.Modal();



    /*var callback = function(allmutations) {
        allmutations.map( function(mr) {
            var mt = 'Тип изменения: ' + mr.type;  // записываем тип изменения
            mt += 'Измененный элемент: ' + mr.target; // записываем измененный элемент.
            var event = setInterval(function(e) {
                KTK.send('searchstartmodal', window);
                clearInterval(event);
            }, 1000);
            //_this.send('searchstartmodal', window)
            //console.log( mr.target );
            //KTK.send('searchstartmodal', mr.target);
        });

    }, mo = new MutationObserver(callback),
    options = {
        // обязательный параметр: наблюдаем за добавлением и удалением дочерних элементов.
        'childList': true,
        // наблюдаем за добавлением и удалением дочерних элементов любого уровня вложенности.
        'subtree': true
    }
    mo.observe(document.body, options);*/
});
;( function( window ) {

    'use strict';

    function extend( a, b ) {
        for( var key in b ) {
            if( b.hasOwnProperty( key ) ) {
                a[key] = b[key];
            }
        }
        return a;
    }

    function sfTab( el, options ) {
        this.el = el;
        this.options = extend( {}, this.options );
        extend( this.options, options );
        this._init();
    }

    sfTab.prototype.options = {
        start : 0
    };

    sfTab.prototype._init = function() {
        // tabs elems
        this.tabs = [].slice.call( this.el.querySelectorAll( 'nav > ul > li' ) );
        // content items
        this.items = [].slice.call( this.el.querySelectorAll( '.ktk-tab-content > section' ) );
        // current index
        this.current = -1;
        // init events
        this._initEvents();
    };

    sfTab.prototype._initEvents = function() {
        var self = this;
        this.tabs.forEach( function( tab, idx ) {
            tab.addEventListener( 'click', function( ev ) {
                ev.preventDefault();
                for(var i = 0; i < self.tabs.length; i++) {
                    self.tabs[i].classList.remove('active');
                    self.items[i].classList.remove('active');
                }
                self._show( idx );
            });
        });
    };

    sfTab.prototype._show = function( idx ) {
        if( this.current >= 0 ) {
            this.tabs[ this.current ].classList.remove('active');
            this.items[ this.current ].classList.remove('active');
        }
        // change current
        if(idx != null) {
            this.current = idx;
            this.tabs[idx].classList.add('active');
            this.items[idx].classList.add('active');
        }

    };

    // add to global namespace
    window.KTKTab = sfTab;

})( window );



;(function() {
    window.addEventListener('DOMContentLoaded', function() {
        [].slice.call( document.querySelectorAll( '.ktk-tab' ) ).forEach( function( el ) {
            new sfTab( el );
        });
    });
})();

'use strict';
/*
 * 32 avalable animation effects (from jQuery UI).
 * More info: https://api.jqueryui.com/easings/
 *
 * linear
 * swing
 * easeInQuad
 * easeOutQuad
 * easeInOutQuad
 * easeInCubic
 * easeOutCubic
 * easeInOutCubic
 * easeInQuart
 * easeOutQuart
 * easeInOutQuart
 * easeInQuint
 * easeOutQuint
 * easeInOutQuint
 * easeInExpo
 * easeOutExpo
 * easeInOutExpo
 * easeInSine
 * easeOutSine
 * easeInOutSine
 * easeInCirc
 * easeOutCirc
 * easeInOutCirc
 * easeInElastic
 * easeOutElastic
 * easeInOutElastic
 * easeInBack
 * easeOutBack
 * easeInOutBack
 * easeInBounce
 * easeOutBounce
 * easeInOutBounce
 */

(function ($) {

    function goTop() {
        var top =  Math.max(document.body.scrollTop,document.documentElement.scrollTop),
            t;
        if(top > 0) {
            window.scrollBy(0, -10);
            t = setTimeout('goTop()', 10);
        } else clearTimeout(t);
        return false;
    }

    $(document).ready(function () {

        var btn = document.querySelector('.ktk-up');
        if(btn != null) {
            var animationEasing = btn.getAttribute('data-animation'),
                scrollSpeed = btn.getAttribute('data-speed');
            scrollOffset = btn.getAttribute('data-offset');

            $(window).scroll(function () {
                var currentScrollTop = $(window).scrollTop();
                if (currentScrollTop > scrollOffset) {
                    $('.ktk-up').addClass('active');
                } else {
                    $('.ktk-up').removeClass('active');
                }
            });



            $('.ktk-up').on("click", function (e) {
                e.preventDefault();
                var currentScrollTop = $(window).scrollTop();
                var animationTime = Math.round((currentScrollTop * 1000) / scrollSpeed);

                document.documentElement.style.transitionProperty = 'all';
                document.documentElement.style.transitionDuration = '0.8s';
                document.documentElement.style.transitionTimingFunction = 'ease';

                (function goTop() {

                    if (window.pageYOffset !== 0) {
                        window.scrollBy(0, -10);
                        setTimeout(goTop, 1);
                    }

                })();
                $("html, body").animate({
                    scrollTop: 0
                }, scrollSpeed);
            });



        }
    });
}(jQuery));

setInterval(function () {
    var className = $('.ktk-up').attr('class');
    if(className != null) {
        $('.usage .current-class').text(className.replace('active', ''));
        $('.usage .current-animation').text($('.animationEasing.active').data('value'));
        $('.usage .current-css').text($('#ktk-up-style').attr('href'));
    }
}, 200);
$(document).ready(function() {
    function isParent(el) {
        if(el) {
            if(el.classList.contains('hide-show')) {
                return el
            } else {
                if(el.parentNode) return isParent(el.parentNode)
            }
        }
    }
    $('.hide-show-btn').on('click', function (e) {
        e.preventDefault();
        var el = isParent(e.currentTarget),
            target = e.currentTarget;
        if(el) {
            if(target.classList.contains('hide')) {
                el.classList.add('hidden')
            } else if(target.classList.contains('show')){
                el.classList.remove('hidden')
            }
        }
    });
});
/** Form 5 */
'use strict';

/* FORMS */
(function ($) {
    $(document).ready(function () {

        // Text based inputs
        var input_selector = ['text', 'password', 'email', 'url', 'tel', 'time', 'month', 'week', 'number', 'datetime', 'search', 'search-md', 'file'].map(function (selector) {
            return 'input[type=' + selector + ']';
        }).join(', ') + ', textarea';

        var text_area_selector = 'textarea';

        var update_text_fields = function update_text_fields($input) {
            var $form = $input.parent('.ktk-form');
            var $labelAndIcon = $input.siblings('label, i');
            var hasValue = $input.val().length;
            var hasPlaceholder = $input.attr('placeholder');
            var label = $input.parent().hasClass('ktk-form-label');
            // let isValid     = $input.validity.badInput === true;
            var addOrRemove = (hasValue || (hasPlaceholder && label) ? 'add' : 'remove') + 'Class';

            $labelAndIcon[addOrRemove]('active');
            $input[addOrRemove]('active');
            $form[addOrRemove]('active');
        };

        var validate_field = function validate_field($input) {

            if ($input.hasClass('validate')) {
                var value = $input.val();
                var noValue = !value.length;
                var isValid = !$input[0].validity.badInput;

                if (noValue && isValid) {
                    $input.removeClass('valid').removeClass('invalid');
                } else {
                    var valid = $input.is(':valid');
                    var length = Number($input.attr('length')) || 0;

                    if (valid && (!length || length > value.length)) {
                        $input.removeClass('invalid').addClass('valid');
                    } else {
                        $input.removeClass('valid').addClass('invalid');
                    }
                }
            }
        };

        var textarea_auto_resize = function textarea_auto_resize() {

            var $textarea = $(undefined);
            if ($textarea.val().length) {
                var _$hiddenDiv = $('.hiddendiv');
                var fontFamily = $textarea.css('font-family');
                var fontSize = $textarea.css('font-size');

                if (fontSize) {
                    _$hiddenDiv.css('font-size', fontSize);
                }
                if (fontFamily) {
                    _$hiddenDiv.css('font-family', fontFamily);
                }
                if ($textarea.attr('wrap') === 'off') {
                    _$hiddenDiv.css('overflow-wrap', 'normal').css('white-space', 'pre');
                }

                _$hiddenDiv.text($textarea.val() + '\n');
                var content = _$hiddenDiv.html().replace(/\n/g, '<br>');
                _$hiddenDiv.html(content);

                // When textarea is hidden, width goes crazy.
                // Approximate with half of window size
                _$hiddenDiv.css('width', $textarea.is(':visible') ? $textarea.width() : $(window).width() / 2);
                $textarea.css('height', _$hiddenDiv.height());
            }
        };

        // Set active on labels and icons (DOM ready scope);
        $(input_selector).each(function (index, input) {
            var $this = $(input);
            var $labelAndIcon = $this.siblings('label, i');
            //var par = $this.parent().hasClass('ktk-form-label');
            //console.log($par)
            update_text_fields($this);
            var isValid = input.validity.badInput; // pure js
            //console.log($this)
            if (isValid && par == true) {
                //console.log(par)
                $labelAndIcon.addClass('active');
            }
        });

        // Add active when element has focus
        $(document).on('focus', input_selector, function (e) {
            $(e.target).siblings('label, i').addClass('active');
            $(e.target).addClass('ktk-form-focus');
        });

        // Remove active on blur when not needed or invalid
        $(document).on('blur', input_selector, function (e) {
            var $this = $(e.target);
            var noValue = !$this.val();
            var invalid = !e.target.validity.badInput;
            var noPlaceholder = $this.attr('placeholder') === undefined;

            if (noValue && invalid) {
                $this.siblings('label, i').removeClass('active');
            }
            $this.removeClass('ktk-form-focus');

            validate_field($this);
        });

        // Add active if form auto complete
        $(document).on('change', input_selector, function (e) {
            var $this = $(e.target);
            update_text_fields($this);
            validate_field($this);
        });

        // Handle HTML5 autofocus
        $('input[autofocus]').siblings('label, i').addClass('active');

        // HTML form reset
        $(document).on('reset', function (e) {
            var $formReset = $(e.target);
            if ($formReset.is('form')) {

                var $formInputs = $formReset.find(input_selector);
                // Reset inputs
                $formInputs.removeClass('valid').removeClass('invalid').each(function (index, input) {
                    var $this = $(input);
                    var noDefaultValue = !$this.val();
                    var noPlaceholder = !$this.attr('placeholder');
                    if (noDefaultValue) {
                        $this.siblings('label, i').removeClass('active');
                    }
                });
            }
        });

        // Textarea auto extend
        if ($('textarea').length) {
            var init = function init() {
                var text = $('textarea');
                text.each(function () {
                    var _this = this;
                    function resize() {
                        _this.style.height = 'auto';
                        _this.style.height = _this.scrollHeight + 'px';
                    }
                    /* 0-timeout to get the already changed text */
                    function delayedResize() {
                        window.setTimeout(resize, 0);
                    }
                    observe(_this, 'change', resize);
                    observe(_this, 'cut', delayedResize);
                    observe(_this, 'paste', delayedResize);
                    observe(_this, 'drop', delayedResize);
                    observe(_this, 'keydown', delayedResize);
                    resize();
                });
            };

            var observe;
            if (window.attachEvent) {
                observe = function observe(element, event, handler) {
                    element.attachEvent('on' + event, handler);
                };
            } else {
                observe = function observe(element, event, handler) {
                    element.addEventListener(event, handler, false);
                };
            }

            init();
        }

        // Textarea Auto Resize
        if (!$('.hiddendiv').first().length) {
            let $hiddenDiv;
            $hiddenDiv = $('<div class="hiddendiv common"></div>');
            $('body').append($hiddenDiv);
        }

        if($("body").is("text_area_selector")){
            $(text_area_selector).each(textarea_auto_resize);
            $('body').on('keyup keydown', text_area_selector, textarea_auto_resize);
        }
    });
})(jQuery);
'use strict';

(function($) {

    $.fn.rkmd_rangeSlider = function() {
        var self, slider_width, slider_offset, curnt, sliderContinuous, sliderDiscrete, range, slider;
        self             = $(this);
        slider_width     = self.outerWidth();
        slider_offset    = self.offset().left;

        sliderContinuous = $('.ktk-form-range');
        sliderDiscrete   = $('.range-led');

        //if(!this.classList.contain('range-led')) {

        sliderContinuous.each(function(i, v) {
            if(!this.classList.contains('range-led')) {
                curnt         = $(this);
                curnt.append(sliderContinuous_tmplt());
                range         = curnt.find('input[type="range"]');
                slider        = curnt.find('.axis');
                slider_fill   = slider.find('.axis-segment');
                slider_handle = slider.find('.axis-pin');

                var range_val = range.val();
                slider_fill.css('width', range_val +'%');
                slider_handle.css('left', range_val +'%');
            } else {
                //sliderDiscrete.each(function(i, v) {
                curnt         = $(this);
                curnt.append(sliderDiscrete_tmplt());
                range         = curnt.find('input[type="range"]');
                slider        = curnt.find('.axis');
                slider_fill   = slider.find('.axis-segment');
                slider_handle = slider.find('.axis-pin');
                slider_label  = slider.find('.axis-count');

                var range_val = parseInt(range.val());
                slider_fill.css('width', range_val +'%');
                slider_handle.css('left', range_val +'%');
                slider_label.find('span').text(range_val);
                //});
            }
        });
        //}

        /*if(self.hasClass('range-led') === true) {


    }*/

        self.on('mousedown', '.axis-pin', function(e) {
            if(e.button === 2) {
                return false;
            }

            var parents       = $(this).parents('.ktk-form-range');
            var slider_width  = parents.outerWidth();
            var slider_offset = parents.offset().left;
            var check_range   = parents.find('input[type="range"]').is(':disabled');

            if(check_range === true) {
                return false;
            }

            if(parents.hasClass('range-led') === true) {
                $(this).addClass('is-active');
            }
            var handlers = {
                mousemove: function(e) {
                    var slider_new_width = e.pageX - slider_offset;

                    if(slider_new_width <= slider_width && !(slider_new_width < '0')) {
                        slider_move(parents, slider_new_width, slider_width);
                    }
                },
                mouseup: function(e) {
                    $(this).off(handlers);

                    if(parents.hasClass('range-led') === true) {
                        parents.find('.is-active').removeClass('is-active');
                    }
                }
            };
            $(document).on(handlers);
        });

        self.on('mousedown', '.axis', function(e) {
            if(e.button === 2) {
                return false;
            }

            var parents       = $(this).parents('.ktk-form-range');
            var slider_width  = parents.outerWidth();
            var slider_offset = parents.offset().left;
            var check_range   = parents.find('input[type="range"]').is(':disabled');

            if(check_range === true) {
                return false;
            }

            var slider_new_width = e.pageX - slider_offset;
            if(slider_new_width <= slider_width && !(slider_new_width < '0')) {
                slider_move(parents, slider_new_width, slider_width);
            }

            var handlers = {
                mouseup: function(e) {
                    $(this).off(handlers);
                }
            };
            $(document).on(handlers);

        });
    };

    function sliderContinuous_tmplt() {
        var tmplt = '<div class="axis">' +
            '<div class="axis-segment"></div>' +
            '<div class="axis-pin"></div>' +
            '</div>';

        return tmplt;
    }
    function sliderDiscrete_tmplt() {
        var tmplt = '<div class="axis">' +
            '<div class="axis-segment"></div>' +
            '<div class="axis-pin"><div class="axis-count"><span>0</span></div></div>' +
            '</div>';

        return tmplt;
    }
    function slider_move(parents, newW, sliderW) {
        var slider_new_val = parseInt(Math.round(newW / sliderW * 100));

        var slider_fill    = parents.find('.axis-segment');
        var slider_handle  = parents.find('.axis-pin');
        var range          = parents.find('input[type="range"]');

        slider_fill.css('width', slider_new_val +'%');
        slider_handle.css({
            'left': slider_new_val +'%',
            'transition': 'none',
            '-webkit-transition': 'none',
            '-moz-transition': 'none'
        });

        range.val(slider_new_val);

        if(parents.hasClass('range-led') === true) {
            parents.find('.axis-pin span').text(slider_new_val);
        }
    }

}(jQuery));


$(document).ready(function() {
    var el = document.body.querySelectorAll('.ktk-form-range');
    if(el.length > 0)
        $('.ktk-form-range').rkmd_rangeSlider();
});
'use strict';

/** *****************
 *  File input     *
 ******************/
/*(function ($) {


  $(document).on('change', '.ktk-form-file-input', function (e) {
    var $this = $(e.target);
    var $file_field = $this.closest('.file-field');
    var $path_input = $file_field.find('input.file-path');
    var files = $this[0].files;
    var file_names = [];

    for (var i = 0; i < files.length; i++) {
      var file_name = files[i].name;
      file_names.push(file_name);
    }

    $path_input.val(file_names.join(', '));
    $path_input.trigger('change');
  });
})(jQuery);*/

window.addEventListener("DOMContentLoaded", function(e) {
    var sf_file = document.querySelectorAll('.ktk-form-file-input');
    if(sf_file) {
        for(var k = 0; k < sf_file.length; k++) {
            var el = sf_file[k];
            if(el) {
                el.addEventListener('change', function(e) {
                    var el = e.currentTarget,
                        files = el.files,
                        label = el.nextElementSibling,
                        strFile = [];

                    for(var k = 0; k < files.length; k++) strFile.push(files[k].name);

                    if(label) {
                        if(strFile.length > 0) {
                            if(label.tagName == "INPUT")
                                label.setAttribute('value', strFile.join(', '));
                            else {
                                label.value = strFile.join(', ');
                                label.style.height = label.scrollHeight + 'px';
                            }
                            label.classList.add('active')
                        }
                    }
                })
            }
        }
    }
})
'use strict';

/* CHARACTER COUNTER */

(function ($) {

    $.fn.characterCounter = function () {
        return this.each(function () {

            var itHasLengthAttribute = $(this).attr('length') !== undefined;

            if (itHasLengthAttribute) {
                $(this).on('input', updateCounter);
                $(this).on('focus', updateCounter);
                $(this).on('blur', removeCounterElement);

                addCounterElement($(this));
            }
        });
    };

    function updateCounter() {
        var maxLength = Number($(this).attr('length'));
        var actualLength = Number($(this).val().length);
        var isValidLength = actualLength <= maxLength;

        $(this).parent().find('span[class="character-counter"]').html(actualLength + '/' + maxLength);

        addInputStyle(isValidLength, $(this));
    }

    function addCounterElement($input) {
        var $counterElement = $('<span/>').addClass('character-counter').css('float', 'right').css('font-size', '12px').css('height', 1);

        $input.parent().append($counterElement);
    }

    function removeCounterElement() {
        $(this).parent().find('span[class="character-counter"]').html('');
    }

    function addInputStyle(isValidLength, $input) {
        var inputHasInvalidClass = $input.hasClass('invalid');
        if (isValidLength && inputHasInvalidClass) {
            $input.removeClass('invalid');
        } else if (!isValidLength && !inputHasInvalidClass) {
            $input.removeClass('valid');
            $input.addClass('invalid');
        }
    }

    $(document).ready(function () {
        $('input, textarea').characterCounter();
    });
})(jQuery);
'use strict';

/*(function ($) {

  $.fn.material_select = function (callback) {
    $(this).each(function () {
      var $select = $(this);

      if ($select.hasClass('browser-default')) {
        return; // Continue to next (return false breaks out of entire loop)
      }

      var multiple = Boolean($select.attr('multiple')),
          lastID = $select.data('select-id'); // Tear down structure if Select needs to be rebuilt

      if (lastID) {
        $select.parent().find('span.caret').remove();
        $select.parent().find('input').remove();

        $select.unwrap();
        $('ul#select-options-' + lastID).remove();
      }

      // If destroying the select, remove the selelct-id and reset it to it's uninitialized state.
      if (callback === 'destroy') {
        $select.data('select-id', null).removeClass('initialized');
        return;
      }

      var uniqueID = guid(); // Materialize.guid();
      $select.data('select-id', uniqueID);
      var wrapper = $('<div class="select-wrapper"></div>');
      wrapper.addClass($select.attr('class'));
      var options = $('<ul id="select-options-' + uniqueID + '" class="dropdown-content select-dropdown ' + (multiple ? 'multiple-select-dropdown' : '') + '"></ul>'),
          selectChildren = $select.children('option, optgroup'),
          valuesSelected = [],
          optionsHover = false;

      var label = $select.find('option:selected').html() || $select.find('option:first').html() || '';

      // Added to search
      var applySeachInList = function applySeachInList() {

        var ul = $(this).closest('ul');
        var searchValue = $(this).val();
        var options = ul.find('li').find('span.filtrable');

        options.each(function () {
          if (typeof this.outerHTML === 'string') {
            var liValue = this.textContent.toLowerCase();

            if (liValue.indexOf(searchValue.toLowerCase()) === -1) {
              $(this).hide();
              $(this).parent().hide();
            } else {
              $(this).show();
              $(this).parent().show();
            }
          }
        });
      };

      // Added to search
      var setSearchableOption = function setSearchableOption() {
        var placeholder = $select.attr('searchable');
        var element = $('<span class="search-wrap"><div class="md-form"><input type="text" class="search form-control" placeholder="' + placeholder + '"></div></span>');
        options.append(element);
        element.find('.search').keyup(applySeachInList);
      };

      // Added to search
      var searchable = Boolean($select.attr('searchable'));

      // Added to search
      if (searchable) {
        setSearchableOption();
      }

      // Function that renders and appends the option taking into
      // account type and possible image icon.
      var appendOptionWithIcon = function appendOptionWithIcon(select, option, type) {
        // Add disabled attr if disabled
        var disabledClass = option.is(':disabled') ? 'disabled ' : '';
        var optgroupClass = type === 'optgroup-option' ? 'optgroup-option ' : '';

        // add icons
        var icon_url = option.data('icon');
        var classes = option.attr('class');
        if (icon_url) {
          var classString = '';
          if (classes) {
            classString = ' class="' + classes + '"';
          }

          // Check for multiple type.
          if (type === 'multiple') {
            options.append($('<li class="' + disabledClass + '"><img alt="" src="' + icon_url + '"' + classString + '><span class="filtrable"><input class="form-check-input" type="checkbox"' + disabledClass + '/><label></label>' + option.html() + '</span></li>'));
          } else {
            options.append($('<li class="' + disabledClass + optgroupClass + '"><img alt="" src="' + icon_url + '"' + classString + '><span class="filtrable">' + option.html() + '</span></li>'));
          }
          return true;
        }

        // Check for multiple type.
        if (type === 'multiple') {
          options.append($('<li class="' + disabledClass + '"><span class="filtrable"><input class="form-check-input" type="checkbox"' + disabledClass + '/><label></label>' + option.html() + '</span></li>'));
        } else {
          options.append($('<li class="' + disabledClass + optgroupClass + '"><span class="filtrable">' + option.html() + '</span></li>'));
        }
      };

      if (selectChildren.length) {
        selectChildren.each(function () {
          if ($(this).is('option')) {
            // Direct descendant option.
            if (multiple) {
              appendOptionWithIcon($select, $(this), 'multiple');
            } else {
              appendOptionWithIcon($select, $(this));
            }
          } else if ($(this).is('optgroup')) {
            // Optgroup.
            var selectOptions = $(this).children('option');
            options.append($('<li class="optgroup"><span>' + $(this).attr('label') + '</span></li>'));

            selectOptions.each(function () {
              appendOptionWithIcon($select, $(this), 'optgroup-option');
            });
          }
        });
      }

      // Check for optgroups
      var optgroup = false;
      if ($select.find('optgroup').length) {
        optgroup = true;
      }

      // Added to save
      var saveSelect = $select.parent().find('button.btn-save');
      var setSaveOption = function setSaveOption() {
        options.append(saveSelect);
      };

      // Save click trigger
      if (saveSelect.length) {
        setSaveOption();
        saveSelect.on('click', function () {
          $('input.select-dropdown').trigger('close');
        });
      }

      options.find('li:not(.optgroup)').each(function (i) {
        $(this).click(function (e) {
          // Check if option element is disabled
          if (!$(this).hasClass('disabled') && !$(this).hasClass('optgroup')) {
            var selected = true;

            if (multiple) {
              $('input[type="checkbox"]', this).prop('checked', function (i, v) {
                return !v;
              });
              if (searchable) {
                if (optgroup) {
                  selected = toggleEntryFromArray(valuesSelected, $(this).index() - $(this).prevAll('.optgroup').length - 1, $select);
                } else {
                  selected = toggleEntryFromArray(valuesSelected, $(this).index() - 1, $select);
                }
              } else if (optgroup) {
                selected = toggleEntryFromArray(valuesSelected, $(this).index() - $(this).prevAll('.optgroup').length, $select);
              } else {
                selected = toggleEntryFromArray(valuesSelected, $(this).index(), $select);
              }
              $newSelect.trigger('focus');
            } else {
              options.find('li').removeClass('active');
              $(this).toggleClass('active');
              $newSelect.val($(this).text());
            }

            activateOption(options, $(this));
            $select.find('option').eq(i).prop('selected', selected);
            // Trigger onchange() event
            $select.trigger('change');
            if (typeof callback !== 'undefined') {
              callback();
            }
          }

          e.stopPropagation();
        });
      });

      // Wrap Elements
      $select.wrap(wrapper);
      // Add Select Display Element
      var dropdownIcon = $('<span class="caret">&#9660;</span>');
      if ($select.is(':disabled')) {
        dropdownIcon.addClass('disabled');
      }

      // escape double quotes
      var sanitizedLabelHtml = label.replace(/"/g, '&quot;');

      var $newSelect = $('<input type="text" class="select-dropdown" readonly="true" ' + ($select.is(':disabled') ? 'disabled' : '') + ' data-activates="select-options-' + uniqueID + '" value="' + sanitizedLabelHtml + '"/>');
      $select.before($newSelect);
      $newSelect.before(dropdownIcon);

      $newSelect.after(options);
      // Check if section element is disabled
      if (!$select.is(':disabled')) {
        $newSelect.dropdown({
          hover: false,
          closeOnClick: false
        });
      }

      // Copy tabindex
      if ($select.attr('tabindex')) {
        $($newSelect[0]).attr('tabindex', $select.attr('tabindex'));
      }

      $select.addClass('initialized');

      $newSelect.on({
        focus: function focus() {
          if ($('ul.select-dropdown').not(options[0]).is(':visible')) {
            $('input.select-dropdown').trigger('close');
          }
          if (!options.is(':visible')) {
            $(this).trigger('open', ['focus']);
            var _label = $(this).val();
            var selectedOption = options.find('li').filter(function () {
              return $(this).text().toLowerCase() === _label.toLowerCase();
            })[0];
            activateOption(options, selectedOption);
          }
        },
        click: function click(e) {
          e.stopPropagation();
        }
      });

      // Changed to search to treat search
      $newSelect.on('blur', function () {

        if (!multiple && !searchable) {
          $(this).trigger('close');
        }
        options.find('li.selected').removeClass('selected');
      });

      // Added to search
      if (!multiple && searchable) {
        options.find('li').on('click', function () {
          $newSelect.trigger('close');
        });
      }

      options.hover(function () {
        optionsHover = true;
      }, function () {
        optionsHover = false;
      });

      // if select is wrapped in modal prevent hiding
      options.on('mousedown', function (e) {
        if ($('.modal-content').find(options).length) {
          if (this.scrollHeight > this.offsetHeight) {
            e.preventDefault();
          }
        }
      });

      // Changed to search to treat search
      $(window).on({
        click: function click() {
          (multiple || searchable) && (optionsHover || $newSelect.trigger('close'));
        }
      });

      // Add initial multiple selections.
      if (multiple) {
        $select.find('option:selected:not(:disabled)').each(function () {
          var index = $(this).index();

          toggleEntryFromArray(valuesSelected, index, $select);
          options.find('li').eq(index).find(':checkbox').prop('checked', true);
        });
      }

      // Make option as selected and scroll to selected position
      var activateOption = function activateOption(collection, newOption) {
        if (newOption) {
          collection.find('li.selected').removeClass('selected');
          var option = $(newOption);
          option.addClass('selected');
          // commented because it causes problems in multiselect with many options
          // options.scrollTo(option)
        }
      };

      // Allow user to search by typing
      // this array is cleared after 1 second
      var filterQuery = [],
          onKeyDown = function onKeyDown(e) {
        // TAB - switch to another input
        if (e.which == 9) {
          $newSelect.trigger('close');
          return;
        }

        // ARROW DOWN WHEN SELECT IS CLOSED - open select options
        if (e.which == 40 && !options.is(':visible')) {
          $newSelect.trigger('open');
          return;
        }

        // ENTER WHEN SELECT IS CLOSED - submit form
        if (e.which == 13 && !options.is(':visible')) {
          return;
        }

        e.preventDefault();

        // CASE WHEN USER TYPE LETTERS
        var letter = String.fromCharCode(e.which).toLowerCase(),
            nonLetters = [9, 13, 27, 38, 40];
        if (letter && nonLetters.indexOf(e.which) === -1) {
          filterQuery.push(letter);

          var string = filterQuery.join(''),
              newOption = options.find('li').filter(function () {
            return $(this).text().toLowerCase().indexOf(string) === 0;
          })[0];

          if (newOption) {
            activateOption(options, newOption);
          }
        }

        // ENTER - select option and close when select options are opened
        if (e.which == 13) {
          var activeOption = options.find('li.selected:not(.disabled)')[0];
          if (activeOption) {
            $(activeOption).trigger('click');
            if (!multiple) {
              $newSelect.trigger('close');
            }
          }
        }

        // ARROW DOWN - move to next not disabled option
        if (e.which == 40) {
          if (options.find('li.selected').length) {
            newOption = options.find('li.selected').next('li:not(.disabled)')[0];
          } else {
            newOption = options.find('li:not(.disabled)')[0];
          }
          activateOption(options, newOption);
        }

        // ESC - close options
        if (e.which == 27) {
          $newSelect.trigger('close');
        }

        // ARROW UP - move to previous not disabled option
        if (e.which == 38) {
          newOption = options.find('li.selected').prev('li:not(.disabled)')[0];
          if (newOption) {
            activateOption(options, newOption);
          }
        }

        // Automaticaly clean filter query so user can search again by starting letters
        setTimeout(function () {
          filterQuery = [];
        }, 1000);
      };

      $newSelect.on('keydown', onKeyDown);
    });

    function toggleEntryFromArray(entriesArray, entryIndex, select) {
      var index = entriesArray.indexOf(entryIndex),
          notAdded = index === -1;

      if (notAdded) {
        entriesArray.push(entryIndex);
      } else {
        entriesArray.splice(index, 1);
      }

      select.siblings('ul.dropdown-content').find('li:not(.optgroup)').eq(entryIndex).toggleClass('active');

      // use notAdded instead of true (to detect if the option is selected or not)
      select.find('option').eq(entryIndex).prop('selected', notAdded);
      setValueToInput(entriesArray, select);

      return notAdded;
    }

    function setValueToInput(entriesArray, select) {
      var value = '';

      for (var i = 0, count = entriesArray.length; i < count; i++) {
        var text = select.find('option').eq(entriesArray[i]).text();

        i === 0 ? value += text : value += ', ' + text;
      }

      if (value === '') {
        value = select.find('option:disabled').eq(0).text();
      }

      select.siblings('input.select-dropdown').val(value);
    }
    // };

    function guid() {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
      });
      return uuid;
    }
  };



})(jQuery);

jQuery('select').siblings('input.select-dropdown').on('mousedown', function (e) {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    if (e.clientX >= e.target.clientWidth || e.clientY >= e.target.clientHeight) {
      e.preventDefault();
    }
  }
});

$(document).ready(function() {
  $('.mdb-select').material_select();
});*/

window.addEventListener('DOMContentLoaded', function(e) {
    var x, i, j, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName("ktk-form-select");

    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /*for each element, create a new DIV that will act as the selected item:*/
        a = x[i].querySelector('label');
        //a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        //x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items inactive");
        for (j = 0; j < selElmnt.length; j++) {
            /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;

            c.addEventListener("click", function(e) {
                /*when an item is clicked, update the original select box,
        and the selected item:*/
                var y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.parentNode.querySelector('label');
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        for (k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);

        a.addEventListener("click", function(e) {
            e.stopPropagation();
            var slc = this.parentNode.querySelector('.select-items');
            if(slc.classList.contains('inactive'))
                slc.classList.remove("inactive");
            else slc.classList.add('inactive')
            this.classList.toggle("active");
            /*this.parentNode.toggle('active');*/
        });
    }
    function closeAllSelect(e) {
        var allslc = document.body.querySelectorAll('.ktk-form-select');

        if(e.target.parentNode !== null)
            var _this = e.target.parentNode.querySelector('label');

        for(var k = 0; k < allslc.length; k++) {
            var slc = allslc[k],
                label = slc.querySelector('label'),
                opt = slc.querySelector('.select-items');
            if(label != _this) {
                label.classList.remove('active');
                opt.classList.add('inactive');
            }
        }
    }
    document.addEventListener("click", closeAllSelect);

    document.getElementById("ktk-translate__list").addEventListener("click", function(){
        if (this.value != RS.lang) {
            let url = window.location.pathname + window.location.search;
            url = url.replace('/ru', '');
            url = url.replace('/en', '');
            //var url = "/locale?lang=" + this.value + "&_orig=" + encodeURIComponent(window.location.pathname + window.location.search);
            window.location = '/' + this.value + url;
        }
    });
});
/*Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }

    return obj;
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);

        if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }

        ownKeys.forEach(function (key) {
            _defineProperty(target, key, source[key]);
        });
    }

    return target;
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
}
*/
