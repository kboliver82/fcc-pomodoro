
function updateCountdown(toggleContainer, countdownContainer, duration) {
    // find the .countdown-container that has the same data-duration-type (session or break)
    var durationType = toggleContainer.data('duration-type');
    var ctDown = $(countdownContainer).closest('[data-duration-type="' + durationType + '"]').find('#countdown');
    ctDown.text(duration.value);
}

function nextDurationType(durationType) {
   if (durationType === 'session') {
       return 'break';
   } else {
       return 'session';
   }
}

var Duration = function(description, value) {
    this.description = description;
    this.value = parseInt(value, 10);
}

Duration.prototype.increment = function() {
    this.value++;
    return this;
};

Duration.prototype.decrement = function() {
    if (this.value > 0) {
        this.value--;
    }

    return this;
};

var Timestamp = function(mins, secs) {
    this.mins = mins || 0;
    this.secs = secs || 0;
}

Timestamp.prototype.init = function(mins, secs) {
    this.mins = mins || 0;
    this.secs = secs || 0;

    return this;
};

Timestamp.prototype.decrement = function() {
    if (this.secs) {
        this.secs--;
    } else if (this.mins) {
        this.secs = 59;
        this.mins--;
    }

    return this;
};

Timestamp.prototype.toString = function() {
    var str = this.mins + ":";
    str += (this.secs < 10 ? '0' : '') + this.secs;

    return str;
};


$(document).ready(function() {
  var countdownContainer = $('.countdown-container');
  var countdownType = countdownContainer.find('#countdownType');
  var countdown = countdownContainer.find('#countdown');
  var durationType = countdownContainer.data('duration-type');
  var timestamp;
  var timerInterval;

  var durations = {};

  $('.duration-input').each(function() {
    var widget = $(this);
    var valueElt = widget.find('.input-value');
    var toggleContainer = widget.find('.toggle-container');
    var dType = toggleContainer.data('duration-type');
    var dText = toggleContainer.prev('.input-label').text();

    durations[dType] = new Duration(dText, valueElt.text());

    widget.find('.minus-button, .plus-button').click(function(evt) {
        var button = $(this);
        var duration = durations[dType];

        if (button.hasClass('minus-button')) {
            duration.decrement();
        } else {
            duration.increment();
        }

        valueElt.text(duration.value);
        updateCountdown(toggleContainer, countdownContainer, duration);

        if (dType === durationType) {
            clearInterval(timerInterval);
            timestamp.init(duration.value);
        }

        evt.preventDefault();
    });
  });

  timestamp = new Timestamp(durations['session']);

  var updateClock = function(ts) {
      countdown.text(timestamp.toString());
  };

  var doClockTick = function() {
      timestamp.decrement();
      updateClock(timestamp);
  };

  var switchDurationTypes = function() {
      durationType = nextDurationType(durationType);
      countdownContainer.data('duration-type', durationType);
      countdownContainer.attr('data-duration-type', durationType);
      var duration = durations[durationType];
      countdownType.text(duration.description);
      timestamp.init(duration.value);
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
                  switchDurationTypes();
              }
          }, 1000);
      }
  });
});
