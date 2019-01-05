var weather = {
	params: config.weather.params || null,
	skyconsTable: {
		'100':'clear-day',
		'101':'cloudy',
		'102':'partly-cloudy-day',
		'103':'partly-cloudy-day',
		'104':'cloudy',
		'200':'wind',
		'202':'wind',
		'203':'wind',
		'204':'wind',
		'205':'wind',
		'206':'wind',
		'207':'wind',
		'208':'wind',
		'209':'wind',
		'210':'wind',
		'211':'wind',
		'212':'wind',
		'213':'wind',
		'300':'sleet',
		'301':'sleet',
		'302':'sleet',
		'303':'sleet',
		'304':'sleet',
		'308':'sleet',
		'310':'sleet',
		'311':'sleet',
		'312':'sleet',
		'313':'sleet',
		'305':'rain',
		'306':'rain',
		'307':'rain',
		'309':'rain',
		'400':'snow',
		'401':'snow',
		'402':'snow',
		'403':'snow',
		'404':'snow',
		'405':'snow',
		'406':'snow',
		'407':'snow',
		'500':'fog',
		'501':'fog',
		'502':'fog',
		'503':'fog',
		'504':'fog',
		'506':'fog',
		'507':'fog',
		'508':'fog',
		'900':'fog',
		'901':'fog',
		'999':'fog'
	},
	fathernodename: "HeWeather6",
	temperatureLocation: ".temp",
	windSunLocation: ".windsun",
	suggestionLocation: ".suggestion",
	forecastLocation: ".forecast",
	updatetimeLocation: ".updatetime",
	apiVersion: "s6",
	apiBase: "https://free-api.heweather.com",
	weatherEndpoint: "weather",
	updateInterval: config.weather.interval || 1800000,
	fadeInterval: config.weather.fadeInterval || 1000,
	intervalId: null,
	orientation: config.weather.orientation || "vertical",
}

/**
 * Rounds a float to one decimal place
 * @param  {float} temperature The temperature to be rounded
 * @return {float}             The new floating point value
 */
weather.roundValue = function (temperature) {
	return parseFloat(temperature).toFixed(1);
}

/**
 * Converts the wind speed (km/h) into the values given by the Beaufort Wind Scale
 * @see http://www.spc.noaa.gov/faq/tornado/beaufort.html
 * @param  {int} kmh The wind speed in Kilometers Per Hour
 * @return {int}     The wind speed converted into its corresponding Beaufort number
 */
weather.ms2Beaufort = function(ms) {
	var kmh = ms * 60 * 60 / 1000;
	var speeds = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117, 1000];
	for (var beaufort in speeds) {
		var speed = speeds[beaufort];
		if (speed > kmh) {
			return beaufort;
		}
	}
	return 12;
}

/**
 * Retrieves the current temperature and weather patter from the heweather.com API
 */
weather.updateCurrentWeather = function () {
	$.ajax({
		type: 'GET',
		url: weather.apiBase + '/' + weather.apiVersion + '/' + weather.weatherEndpoint,
		dataType: 'json',
		data: weather.params,
		success: function (data) {
			
			var wjson = data[weather.fathernodename][0];
			// alert(JSON.stringify(wjson));
			// basic
			var _basic	= wjson.basic;
			var city	= '南华',//_basic.location,
				cnty	= _basic.cnty,
				lat		= _basic.lat,
				lon		= _basic.lon,
				update	= wjson.update.loc;
			// aqi
			// var _aqi	= wjson.aqi.location;
			// var aqi		= _aqi.aqi,
			// 	co		= _aqi.co,
			// 	no2		= _aqi.no2,
			// 	o3		= _aqi.o3,
			// 	pm10	= _aqi.pm10,
			// 	pm25	= _aqi.pm25,
			// 	so2		= _aqi.so2,
			// 	qlty	= _aqi.qlty;
			// now
			var _now	= wjson.now;
			var concode	= _now.cond_code,
				contxt	= _now.cond_txt,
				fl		= _now.fl,
				hum		= _now.hum,
				pcpn	= _now.pcpn,
				tmp		= _now.tmp,
				vis		= _now.vis,
				pres	= _now.pres,
				winddeg	= _now.wind_deg,
				winddir	= _now.wind_dir,
				windsc	= _now.wind_sc,
				winspd	= _now.wind_spd;
			// suggestion
			var _suggestion = wjson.lifestyle;
			var comfbrf		= _suggestion[0].brf,
				comftxt		= _suggestion[0].txt,
				drsgbrf		= _suggestion[1].brf,
				drsgtxt		= _suggestion[1].txt,
				flubrf		= _suggestion[2].brf,
				flutxt		= _suggestion[2].txt,
				sportbrf	= _suggestion[3].brf,
				sporttxt	= _suggestion[3].txt,
				travbrf		= _suggestion[4].brf,
				travtxt		= _suggestion[4].txt,
				uvbrf		= _suggestion[5].brf,
				uvtxt		= _suggestion[5].txt,
				cwbrf		= _suggestion[6].brf,
				cwtxt		= _suggestion[6].txt,
				airbrf      = _suggestion[7].brf.
				airtxt      = _suggestion[7].txt;
			var _newWindHtml = winddir+windsc+"级";
			var _uv_index = wjson.daily_forecast[0].uv_index;

			var _now = moment().format('HH:mm'),
				_sunrise = wjson.daily_forecast[0].sr,
				_sunset = wjson.daily_forecast[0].ss;


			var _newSunHtml = '<span class="sun"><span class="wi wi-sunrise xdimmed"></span> ' + _sunrise + '</span>';

			if (_sunrise < _now && _sunset > _now) {
				_newSunHtml = '<span class="sun"><span class="wi wi-sunset xdimmed"></span> ' + _sunset + '</span>';
			}

			$(this.windSunLocation).updateWithText(_newWindHtml+ ' ' + _newSunHtml,this.fadeInterval);

			var icons = new Skycons({"color": "white"});
			var _icon = '<canvas id="animateicon" width="64" height="64" style="position:relative;display:inline-block;padding-right:15px;top:5px;"></canvas>';
			var _newTempHtml = _icon + tmp +'&deg;';




			// $(this.temperatureLocation).updateWithText(_newTempHtml, this.fadeInterval);
			$(this.temperatureLocation).updateWithText(_newTempHtml);
			icons.set("animateicon", this.skyconsTable[concode]);
			icons.play();

			var thtext2 = '<div>' + _uv_index + '</div><div class="small" style="font-size:18px">紫外线强度</div>'
  			var thtext3 = '<div>' + hum    + '%</div><div class="small" style="font-size:18px">相对湿度</div>'
  			var thtext  = '<div class="temhum_left">'+thtext2+'</div><div class="temhum_right">'+thtext3+'</div>'
  			$('.temhum').updateWithText(thtext, this.fadeInterval);
			
			// Week forecast start
			var _opacity = 1,
				_forecastHtml = '<tr>',
				_forecastHtml2 = '<tr>',
				_forecastHtml3 = '<tr>',
				_forecastHtml4 = '<tr>';
			_forecastHtml = '<table class="forecast-table"><tr>';
			for (var i = 0, count = wjson.daily_forecast.length; i < count; i++) {
				var _forecast = wjson.daily_forecast[i];
				if (this.orientation == 'vertical') {
					_forecastHtml2 = '';
					_forecastHtml3 = '';
					_forecastHtml4 = '';
				}
				var _dayName,
					_dayNameBase  = [" 今天 "," 明天 "," 后天 "];
				if (i < 3) {
					_dayName = _dayNameBase[i];
				} else {
				_dayName = moment(_forecast.date).locale('zh-cn').format('ddd');
				}
				_forecastHtml += '<td style="opacity:' + parseFloat(_opacity).toFixed(2) + '"class="day">' + _dayName + '</td>';
				//_forecastHtml2 += '<td style="opacity:'+ _opacity +'" class="icon-small' + this.iconTable[_forecast.weather[0].icon] + '"></td>';
				_forecastHtml2 += '<td style="opacity:' + parseFloat(_opacity).toFixed(2) + '">'+ _forecast.cond_txt_d+'</td>';
				_forecastHtml3 += '<td style="opacity:' + parseFloat(_opacity).toFixed(2) + '"class="temp-max">' + _forecast.tmp_max + '&deg;</td>';
				_forecastHtml4 += '<td style="opacity:' + parseFloat(_opacity).toFixed(2) + '"class="temp-min">' + _forecast.tmp_min + '&deg;</td>';
				_opacity -= 0.05;
				if (this.orientation == 'vertical') {
					_forecastHtml += _forecastHtml2 + _forecastHtml3 + _forecastHtml4 + '</tr>';
				}
			}
			_forecastHtml  += '</tr>',
			_forecastHtml2 += '</tr>',
			_forecastHtml3 += '</tr>',
			_forecastHtml4 += '</tr>';
			if (this.orientation == 'vertical') {
				_forecastHtml += '</table>';
			} else {
				_forecastHtml += _forecastHtml2 + _forecastHtml3 + _forecastHtml4 +'</table>';
			}
			$(this.forecastLocation).updateWithText(_forecastHtml, this.fadeInterval);
			
			// Week forecast end

			var _newSuggestionHtml = "<img src='images/geo_icon.jpg' width='24' height='24' style='vertical-align:text-bottom;'>" + city +" 今天 "+ comfbrf + '，' + comftxt;
			$(this.suggestionLocation).updateWithText(_newSuggestionHtml, this.fadeInterval);
			
			var _updateTimeHtml = " 最后更新时间："+moment(update).format('HH:mm');
			$(this.updatetimeLocation).updateWithText(_updateTimeHtml, this.fadeInterval);


		}.bind(this),
		error: function () {
			// if error occur
		}
	});

}

weather.init = function () {
	this.intervalId = setInterval(function () {
		this.updateCurrentWeather();
	}.bind(this), this.updateInterval);
	this.updateCurrentWeather();
}