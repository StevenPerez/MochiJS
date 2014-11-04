/* >> Steven Pérez Alfaro << */
/*======================================
=            ARRAY POLYFILL            =
======================================*/

if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun/*, thisArg*/) {
    'use strict';

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];

        // NOTE: Technically this should Object.defineProperty at
        //       the next index, as push can be affected by
        //       properties on Object.prototype and Array.prototype.
        //       But that method's new, and collisions should be
        //       rare, so use the more-compatible alternative.
        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
};

/*-----  End of ARRAY POLYFILL  ------*/

;/*======================================
=            DATE PROTOTYPE            =
======================================*/

Date.prototype.monthName = function(language) {
	var monthName = "";
	language = language || 'en';

	switch(language.toLowerCase()) 
	{
		case 'en':
			monthName = ['January','February','March','April','May','June','July', 'August','September','October','November','December'];
			break;
		case 'es':
			monthName = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio', 'Agosto','Setiembre','Octubre','Noviembre','Diciembre'];
			break;
	}
	
	return monthName[this.getMonth()];
};

Date.prototype.dayName = function(language) {
	var dayName = "";
	language = language || 'en';

	switch(language.toLowerCase()) 
	{
		case 'en':
			dayName = ['Sunday','Monday','Tuesday','Wednesday', 'Thursday','Friday','Saturday'];
			break;
		case 'es':
			dayName = ['Domingo','Lunes','Martes','Miércoles', 'Jueves','Viernes','Sábado'];
			break;
	}
	
	return dayName[this.getDay()];
};

/*-----  End of DATE PROTOTYPE  ------*/




;/*========================================
=            FORMAT PROTOTYPE            =
========================================*/

String.prototype.addMiles = function()
{
	try
	{
		var value = this.toString().trim();

	    value += '';
	    x = value.split('.');
	    x1 = x[0];
	    x2 = x.length > 1 ? '.' + x[1] : '';
	    var rgx = /(\d+)(\d{3})/;
	    while (rgx.test(x1)) {
	        x1 = x1.replace(rgx, '$1' + ',' + '$2');
	    }
	    return x1 + x2;
	}
	catch (err)
	{
		return null;
	}
};

Number.prototype.addMiles = function()
{
	try
	{
		var value = this.toString().trim();

	    value += '';
	    x = value.split('.');
	    x1 = x[0];
	    x2 = x.length > 1 ? '.' + x[1] : '';
	    var rgx = /(\d+)(\d{3})/;
	    while (rgx.test(x1)) {
	        x1 = x1.replace(rgx, '$1' + ',' + '$2');
	    }
	    return x1 + x2;
	}
	catch (err)
	{
		return null;
	}
};

String.prototype.removeMiles = function()
{
	try
	{
		var value = this.toString().trim();
		value = parseFloat(value.replace(/,/g, ''));

		return value;
	}
	catch(err)
	{
		return null;
	}
};

Number.prototype.removeMiles = function()
{
	try
	{
		var value = this.toString().trim();
		value = parseFloat(value.replace(/,/g, ''));

		return value;
	}
	catch(err)
	{
		return null;
	}
};


/*-----  End of FORMAT PROTOTYPE  ------*/

;/*========================================
=             IS PROTOTYPE                =
========================================*/

String.prototype.isNumber = function()
{
	try
	{
		var value = this.toString();

		value = value.replace(",","");

	    if (parseFloat(value)!= value)
	    	return false;
	    else
	    	return true;
	}
	catch (err)
	{
		return false;
	}
};

Number.prototype.isNumber = function()
{
	try
	{
		var value = this.toString();

		value = value.replace(",","");

	    if (parseFloat(value)!= value)
	    	return false;
	    else
	    	return true;
	}
	catch (err)
	{
		return false;
	}
};

String.prototype.isBlank = function()
{
	try
	{
		var value = this.toString().trim();

		// Validate is null
		if (value == null) return true;

		// Validate by length
	    if (value.length == 0)
	    	return true;
	    else
	    	return false;
	}
	catch(err)
	{
		return false;
	}
};

String.prototype.isDate = function(dateFormat)
{
	try
	{
		var value = this.toString().trim();

		var dateFormat = dateFormat || 'mm/dd/yyyy', // default format

		  delimiter = /[^mdy]/.exec(dateFormat)[0],
		  theFormat = dateFormat.split(delimiter),
		  theDate = value.split(delimiter),

		  isDate = function (date, format) {
		    var m, d, y
		    for (var i = 0, len = format.length; i < len; i++) {
		      if (/m/.test(format[i])) m = date[i]
		      if (/d/.test(format[i])) d = date[i]
		      if (/y/.test(format[i])) y = date[i]
		    }
		    return (
		      m > 0 && m < 13 &&
		      y && y.length === 4 &&
		      d > 0 && d <= (new Date(y, m, 0)).getDate()
		    )
		  }

		  return isDate(theDate, theFormat)
  	}
  	catch (err)
  	{
  		return false;
  	}
};

String.prototype.isEmail = function() 
{ 
	try
	{
		var value = this.toString().trim();
		
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(value);
	}
	catch (err)
	{
		if (bln_msg) alert(err.message);
		return false;
	}
} 
/*-------  End of IS PROTOTYPE  --------*/

;/*================================
=            EXTERNAL            =
================================*/

(function () {

  var AM = 'am'
    , PM = 'pm'
    , periodRegex = new RegExp('([ap](\\.?)(m\\.?)?)', 'i')
    , timeRegex = new RegExp('^(10|11|12|0?[1-9])(?::|\\.)?([0-5][0-9])?'
                             + periodRegex.source + '?$', 'i')
    , formatRegex = new RegExp('^(h|hh)([:|\.])?(mm)?( ?)'
                               + periodRegex.source + '?$', 'i');

  // play nice with both node.js and browser
  if (typeof module !== 'undefined' && module.exports) module.exports = Time;
  else window.Time = Time;

  /*
   * Time constructor works with(out) 'new'
   *
   * @time (optional) string or number representing a time.
   *   e.g. 7, 1234, '7', '7:00', '12.14'
   *
   *   If not provided, current time is used.
   */
  function Time(time) {
    if (!(this instanceof Time)) return new Time(time);

    var hours, minutes, period = null;

    if (time) {
      var result = timeRegex.exec(sanitize(time));
      if (result) {
        hours = parseInt(result[1]);
        minutes = result[2] ? parseInt(result[2]) : 0;
        period = parsePeriod(result[3]);
      }
    } else {
      // set to current time
      var d = new Date();
      hours = d.getHours();
      period = hours > 11 ? PM : AM;
      if (hours > 12) hours -= 12;
      if (hours === 0) hours = 12;
      minutes = d.getMinutes();
    }

    // gets or sets hours
    this.hours = function(newHours) {
      if (!newHours) return hours;
      hours = parseInt(newHours);
    };

    // gets or sets minutes
    this.minutes = function(newMinutes) {
      if (!newMinutes) return minutes;
      minutes = parseInt(newMinutes);
    };

    // gets or sets period
    this.period = function(newPeriod) {
      if (!newPeriod) return period;
      period = parsePeriod(newPeriod);
    };
  }

  /*
   * Find the next immediate corresponding Date.
   *
   * Assume it's 3:15 pm Aug 10:
   * Time('3:15').nextDate() // 3:15 pm Aug 10
   * Time('415').nextDate()  // 4:15 pm Aug 10
   * Time('2').nextDate()    // 2:00 am Aug 11
   */
  Time.prototype.nextDate = function () {
    if (!this.isValid()) return null;

    var hours = this.hours() === 12 ? 0 : this.hours(); // uniformly handle am/pm adjustments
    if (this.period() === PM) hours += 12;
    var d = new Date();
    d.setHours(hours);
    d.setMinutes(this.minutes());
    d.setSeconds(0);
    d.setMilliseconds(0);

    // if it has already passed, add 12 hours at a time until it's in the future
    while (new Date() > d) d.setHours(d.getHours() + 12);

    // make sure we're in the correct period
    if (d.getHours() > 11 && this.period() === AM) d.setHours(d.getHours() + 12)
    else if (d.getHours() < 12 && this.period() === PM) d.setHours(d.getHours() + 12)

    return d;
  };

  Time.isValid = function(time) {
    return timeRegex.test(sanitize(time));
  };

  Time.prototype.isValid = function() {
    return Time.isValid(toString(this));
  };

  /*
   * This can be safely changed if so desired.
   */
  Time.DEFAULT_TIME_FORMAT = 'h:mm am';

  /*
   * Formats the time to the given format, or h:mm if one is not provided.
   *
   * If periods are specified in the format, they are only printed if known.
   *
   * If the time isn't valid, return 'invalid time'.
   * If the format isn't valid, return 'invalid format'.
   *
   * This isn't every combination, but hopefully you get the gist of things.
   * h:mm       12:00       (default)
   * hh:mm      01:00
   * h          1
   * h          1:55        (input specified minutes, so we show them)
   * h.         1.55        (if minutes are shown, use . for separator)
   * hpm        1am
   * h:mm a     1:55 p
   * h:mm a     1:55        (input didn't specify period)
   * h.mm am    1.55 pm
   * h.mm A     1.55 P
   * hh:mm a.m. 01:55 a.m.
   * h:mma      1:55a
   * h.mm       1.55
   */
  Time.prototype.format = function(format) {
    format = format || Time.DEFAULT_TIME_FORMAT;
    if (!this.isValid()) {
      return 'invalid time';
    } else if (!formatRegex.test(format)) {
      return 'invalid format';
    }
    return toString(this, format);
  };

  /*
   * Alias for `format`.
   */
  Time.prototype.toString = Time.prototype.format;

  /*
   * (private) Format Time in the given format.
   *
   * @time Time instance
   * @retun hh:mm e.g. 3:00, 12:23, undefined:undefined
   */
  function toString(time, format) {
    format = format || Time.DEFAULT_TIME_FORMAT;
    var bits = formatRegex.exec(format);
    var fHour = bits[1];
    var fMiddlebit = bits[2];
    var fMinutes = bits[3];
    var fPeriodSpace = bits[4];
    var fPeriod = bits[5];
    var fFirstPeriod = bits[6];
    var fPeriodM = bits[7];

    // always show hour
    var hours = fHour.length == 2 ? padTime(time.hours()) : time.hours();

    // show if in the format or if non-zero and middlebit is provided
    var minutes = (fMinutes || (fMiddlebit && time.minutes() !== 0)) ?
                    padTime(time.minutes()) : '';

    // show middlebit if we have minutes
    var middlebit = (minutes && fMiddlebit) ? fMiddlebit : '';

    // show period if available and requested
    var period = '';
    if (fPeriod && time.period()) {
      var firstPeriod = time.period().charAt(0);
      if (fPeriod.charAt(0) === fPeriod.charAt(0).toUpperCase()) {
        firstPeriod = firstPeriod.toUpperCase();
      }
      period = firstPeriod + fPeriod.slice(1);
    }

    // only show space if it was requested by format and there's a period
    var space = (period && fPeriodSpace) ? fPeriodSpace : '';

    return '' + hours + middlebit + minutes + space + period;
  }

  function padTime(time) {
    return time < 10 ? '0' + time : time;
  }

  /*
   * (private) Force @time to a string and remove all whitespace.
   *
   * @time input
   * @retun input as a string, with all white space removed
   */
  function sanitize(time) {
    return time.toString().replace(/\s/g, '');
  }

  /*
   * (private)
   */
  function parsePeriod(period) {
    if (!period || !period.match(periodRegex)) return null;
    else if (period.match(/^p/i) != null) return PM;
    return (period.match(/^a/i) != null) ? AM : null;
  }
})();


/*-----  End of EXTERNAL  ------*/
;/*===========================================
=            GENERATOR PROTOTYPE            =
===========================================*/

function genID()
{
	try
	{
		var now = new Date();

		var components = [
		    now.getFullYear(),
		    (now.getMonth() + 1) < 9 ? '0' + now.getMonth().toString() : now.getMonth().toString(),
		    (now.getDate() < 9) ? '0' + now.getDate().toString() : now.getDate().toString(),
		    now.getHours(),
		    now.getMinutes(),
		    now.getSeconds(),
		    now.getMilliseconds()
		];

		return components.join("");
	}
	catch(err)
	{
		console.log(err);
		return '';
	}
};

/*-----  End of GENERATOR PROTOTYPE  ------*/

