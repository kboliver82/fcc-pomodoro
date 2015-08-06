
function updateCountdown(toggleContainer, countdownContainer, value) {
    // find the .countdown-container that has the same data-duration-type (session or break)
    var durationType = toggleContainer.data('duration-type');
    var ctDown = $(countdownContainer).closest('[data-duration-type="' + durationType + '"]').find('#countdown');
    ctDown.text(value);
}

function toTimestamp(val) {
    return {
        mins: val,
        secs: 0
    };
}

function toTimestampString(timestamp) {
    var str = timestamp.mins + ":";
    str += (timestamp.secs < 10 ? '0' : '') + timestamp.secs;

    return str;
}

function decrementTimestamp(timestamp) {
    var result = {
        mins: timestamp.mins || 0,
        secs: timestamp.secs || 0
    };

    if (result.secs) {
        result.secs--;
    } else if (result.mins) {
        result.secs = 59;
        result.mins--;
    }

    return result;
}

$(document).ready(function() {
  var countdownContainer = $('.countdown-container');
  var countdownType = countdownContainer.find('#countdownType');
  var countdown = countdownContainer.find('#countdown');
  var timestamp = toTimestamp(countdown.text());
  var timerInterval;

  $('.duration-input').each(function() {
    var widget = $(this);
    var valueElt = widget.find('.input-value');

    widget.find('.minus-button').click(function(evt) {
        clearInterval(timerInterval);

        var value = parseInt(valueElt.text(), 10);
        if (value > 0) {
            value--;
            valueElt.text(value);

            updateCountdown($(this).closest('.toggle-container'), countdownContainer, value);
            timestamp = toTimestamp(countdown.text());
        }

        evt.preventDefault();
    });

    widget.find('.plus-button').click(function(evt) {
        clearInterval(timerInterval);

        var value = parseInt(valueElt.text(), 10);
        value++;
        valueElt.text(value);

        updateCountdown($(this).closest('.toggle-container'), countdownContainer, value);
        timestamp = toTimestamp(countdown.text());
        evt.preventDefault();
    });
  });

  var updateClock = function(ts) {
      countdown.text(toTimestampString(ts));
  };

  var doClockTick = function() {
      timestamp = decrementTimestamp(timestamp);
      updateClock(timestamp);
  };

  countdownContainer.click(function() {
      if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
      } else {
          updateClock(timestamp);

          timerInterval = setInterval(function() {
              doClockTick();

              if (timestamp.mins === 0 && timestamp.secs === 0) {
                  clearInterval(timerInterval);
              }
          }, 1000);
      }
  });
});
