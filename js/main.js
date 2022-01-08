/**
parallax bg
*/

if (window.matchMedia("(min-width: 1100px)").matches) {
    (function($) {
        var parallax = -0.5;

        var $bg_images = $(".first-screen");
        var offset_tops = [];
        $bg_images.each(function(i, el) {
            offset_tops.push($(el).offset().top);
        });

        $(window).scroll(function() {
            var dy = $(this).scrollTop();
            $bg_images.each(function(i, el) {
                var ot = offset_tops[i];
                $(el).css("background-position", "50% " + (dy - ot) * parallax + "px");
            });
        });
    })(jQuery);

}

/**
 custom select
 */

$('.custom-select').each(function() {
    var $this = $(this),
        numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select__inner"></div>');
    $this.after('<div class="select__active-option"></div>');

    var $styledSelect = $this.next('div.select__active-option');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'select__options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            'class': 'select__options-item',
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select__active-option.opened').not(this).each(function() {
            $(this).removeClass('opened').next('ul.select__options').hide();
        });
        $(this).toggleClass('opened').next('ul.select__options').toggle();
    });

    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('opened');
        $this.val($(this).attr('rel'));
        $list.hide();
    });

    $(document).click(function() {
        $styledSelect.removeClass('opened');
        $list.hide();
    });

});

/**
 Range slider
 */

if ($(".checkout__form-range").length) {
    var rangeSlider = function() {
        var slider = $('.checkout__form-range'),
            range = $('.checkout__form-range-line'),
            value = $('.checkout__form-range-value');

        slider.each(function() {

            value.each(function() {
                var value = $(this).parent().next().attr('value');
                $(this).html(value + ' %');
            });

            range.on('input', function() {
                $(this).prev().find(value).html(this.value + ' %');
            });
        });
    };

    rangeSlider();

}

/**
 Custom input file
 */

if ($(".checkout__form-input-file").length) {
    var fileInput = document.querySelector(".checkout__form-input-file"),
        button = document.querySelector(".checkout__add-file"),
        the_return = document.querySelector(".file-return");

    button.addEventListener("keydown", function(event) {
        if (event.keyCode == 13 || event.keyCode == 32) {
            fileInput.focus();
        }
    });
    button.addEventListener("click", function(event) {
        fileInput.focus();
        return false;
    });
    fileInput.addEventListener("change", function(event) {
        the_return.innerHTML = this.value;
    });
}

/**
 * Preloader
 */

if ($(".preloader").length) {


    function loadData() {
        return new Promise((resolve, reject) => {
            // setTimeout не является частью решения
            // Код ниже должен быть заменен на логику подходящую для решения вашей задачи
            setTimeout(resolve, 2400);
        })
    }

    loadData()
        .then(() => {
            let preloaderEl = document.getElementById('preloader');
            preloaderEl.classList.add('hidden');
            preloaderEl.classList.remove('visible');
            $('.header, .first-screen__title, .first-screen__subtitle, .first-screen__list, .first-screen__buttons, body').addClass('show');
        });
}

/**
 * Mobile menu open
 */

$('.menu__open-btn').on('click', function() {
    $(this).toggleClass('active');
    $('.menu, .header').toggleClass('opened')
});