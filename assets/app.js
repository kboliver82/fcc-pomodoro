
function updateCountdown(toggleContainer, value) {
    // find the .countdown-container that has the same data-duration-type (session or break)
    var durationType = toggleContainer.data('duration-type');
    var ctDown = $('.countdown-container[data-duration-type="' + durationType + '"]').find('#countdown');
    ctDown.text(value);
}


$(document).ready(function() {

  $('.duration-input').each(function() {
    var widget = $(this);
    var valueElt = widget.find('.input-value');

    widget.find('.minus-button').click(function(evt) {
        var value = parseInt(valueElt.text(), 10);
        if (value > 0) {
            value--;
            valueElt.text(value);

            updateCountdown($(this).closest('.toggle-container'), value);
        }

        evt.preventDefault();
    });

    widget.find('.plus-button').click(function(evt) {
        var value = parseInt(valueElt.text(), 10);
        value++;
        valueElt.text(value);

        updateCountdown($(this).closest('.toggle-container'), value);
        evt.preventDefault();
    });
  });
});
