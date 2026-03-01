function togglePassSee() {
    var input = $('.password input');
    var type = input.attr("type");
    $('.password-see').toggleClass('active');
    if (type == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
}

$('.tab-item').on('click', function () {
    var target = $(this).data('href');
    $('.tabcontent,.tab-item').removeClass('active');
    $('.restaruant-tabs-item[data-href="'+target+'"]').addClass('active');
    $('#'+target).addClass('active');
});
$('.js-open-search-filter-modal').on('click', function () {
    $('#search_filter_modal').addClass('active');
});

$(document).on('change', '.js-filter-all', function () {
    var checked = $(this).is(':checked');
    $(this).closest('.search-filter-section')
        .find('.switch__input').not(this)
        .prop('checked', checked);
});
