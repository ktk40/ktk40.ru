"use strict";

/* вызов события при выделении текста */

var speakText = function(event) {
    // поиск всех кнопок с классом voice на странице
    var isButton = document.getElementsByClassName("voice");

    /* получаем выделенный текст  */
    var selObj = window.getSelection();
    var utterance = new SpeechSynthesisUtterance(selObj);
    utterance.lang = "ru-RU";

    /* создание кнопки на странице  */
    var addButton = document.createElement("button");
    var icon = document.createElement("i");
    var tag = event.target.tagName;

    /* кнопка для прекращения озвучивания текста */
    const stopSpeakButton = document.querySelector(".stopSpeak");

    /* если выделен текст и нету  кнопки */
    if (selObj.toString().length > 2 && !(tag === "BUTTON" || tag === "svg" || tag === "path") && isButton.length < 1) {
        /* кнопка для чтения */
        addButton.className = "voice";
        icon.className = "fas fa-volume-up";
        stopSpeakButton.addEventListener("click", function () {
            speechSynthesis.pause();
            stopSpeakButton.style.display = "none";
            addButton.style.display = "block";
        });

        /* получаем позицию, где произошел клик */
        addButton.style.top = event.pageY + 60 + 'px';
        addButton.style.left = event.pageX - 20 + 'px';

        /* добавление кнопки в DOM-дерево */
        document.body.appendChild(addButton);
        addButton.appendChild(icon);

        /* событие на кнопке */
        addButton.addEventListener("click", function () {
            /* озвучиваем выделенный текст */
            speechSynthesis.resume();
            speechSynthesis.speak(utterance);
            /* скрываем кнопку воспроизведения */
            addButton.style.display = "none";

            /* Показываем кнопку прекращения озвучки */
            stopSpeakButton.style.display = "block";
            stopSpeakButton.style.top = event.pageY + 60 + 'px';
            stopSpeakButton.style.left = event.pageX - 20 + 'px';
        });

    } else if (selObj.toString().length < 2)  {
        /* Удаление кнопки  */
        for (var i = 0; i < isButton.length; i++) {
            document.body.removeChild(isButton[i]);
        }
        stopSpeakButton.style.display = "none";
        /* Остановить чтение текста */
        selObj = "";
        speechSynthesis.cancel();
    }
};

if (navigator.userAgent.search(/MSIE/) > 0 || navigator.userAgent.search(/NET CLR /) > 0) {
    console.log("Internet Explorer не поддерживает чтение текста!");
} else {
    document.addEventListener("click", speakText);
}
