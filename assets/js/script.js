var target = [];

$('.card-category p').click(function (e) {
    e.preventDefault();

    if ($(this).hasClass('checked')) {
        $(this).removeClass('checked');
        var currentIndex = target.indexOf($(this).attr('data-target'));
        target.splice(currentIndex, 1);
        $('#category').find('.card-product').removeClass('cableItem-hide');

    } else {
        $(this).addClass('checked');
        target.push($(this).attr('data-target'));
    }

    $.each(target, function (index, value) {
        $('#category').find('.card-product:not([data-target*="' + value + '"])').addClass('cableItem-hide');
    });

});