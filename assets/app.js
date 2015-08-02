
$(document).ready(function() {

  $('.duration-input').each(function() {
    var widget = $(this);
    var valueElt = widget.find('.input-value');

    widget.find('.minus-button').click(function() {
        var value = parseInt(valueElt.text(), 10);
        if (value > 0) {
            value--;
            valueElt.text(value);
        }
    });

    widget.find('.plus-button').click(function() {
        var value = parseInt(valueElt.text(), 10);
        value++;
        valueElt.text(value);
    });
  });
});
