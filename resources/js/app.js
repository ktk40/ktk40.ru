document.addEventListener("DOMContentLoaded", () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.remove('theme-light');
        document.body.classList.add('theme-dark');
        document.body.setAttribute('data-bs-theme', 'dark')
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        var newColorScheme = event.matches ? "dark" : "light";
        if (newColorScheme == "dark") {
            document.body.classList.remove('theme-light');
            document.body.classList.add('theme-dark');
            document.body.setAttribute('data-bs-theme', 'dark')
        } else {
            document.body.classList.remove('theme-dark');
            document.body.classList.add('theme-light');
            document.body.setAttribute('data-bs-theme', 'light')
        }
    })
});

window.addEventListener("DOMContentLoaded", function () {
    $('#ktk-nav-8aryOB').ktkNavMulti({
        searchContainer: true,
        horizontalSubmenu: true,
        transferHeadingItem: false,
        //===================== ФИКСИРОВАННОЕ =====================//
        fixedFlag: true,
        fixedId: "#ktk-fixed-id-8aryOB",
        fixedClass: 'nav-fixed-8aryOB nav-fixed',
        //===================== ПОЛНОЭКРАННОЕ =====================//
        fullScreenFlag: false,
        fullScreenTheme: 'theme-light full-screen-color-8aryOB',
        //===================== ТРАНСФОРМ =====================//
        transformFlag: true,
        transformPaddingOne: 'p-3 t-0',
        transformPaddingLower: ' t-0',
        transformEffectHover: 'blackout',
        transformTheme: 'theme-light child-color-submenu-8aryOB',
        //===================== МОБИЛЬНОЕ =====================//
        mobileFlag: true,
    });
});

window.addEventListener("DOMContentLoaded", function () {
    $('#ktk-nav-ktk').ktkNavMulti({
        searchContainer: false,
        horizontalSubmenu: false,
        transferHeadingItem: false,
        fixedFlag: false,
        fullScreenFlag: false,
        transformFlag: true,
        transformPaddingOne: 'p-2 t--1',
        transformPaddingLower: ' t--1',
        transformEffectHover: 'allotment',
        transformTheme: 'theme-light child-color-submenu-ktk fixed-theme-light-submenu fixed-submenu-color-ktk',
        mobileFlag: true
    });
});

window.addEventListener("DOMContentLoaded", function () {
    $(".modal-window-home").click(function () {
        closeModalWindow();
    }).children().click(function (e) {
        e.stopPropagation();
    });
});

import 'lazysizes';
import 'bootstrap';
import '../assets/ktk/framework/core/js/ktk-full.js';
import '../assets/ktk/framework/plugin/navigation/js/ktk-nav.min.js';
import 'swiper';
//import '../assets/vendor/slep/js/uhpv-full.min.js';
