<html>
 <head> 
  <title>usc_ZBL</title> 
  <style type="text/css">
		<?php include('css/main.css') ?>
	</style> 
  <link rel="stylesheet" type="text/css" href="css/weather-icons.css">
  <link rel="stylesheet" type="text/css" href="css/font-awesome.css">
  
  <!-- <script type="text/javascript">
		var gitHash = '<?php echo trim(`git rev-parse HEAD`) ?>';
	</script>  -->
  <meta name="google" value="notranslate" /> 
  <meta http-equiv="Content-type" content="text/html; charset=utf-8" /> 
 </head> 
 <body> 
  <div class="top left">
   <div class="date small dimmed"></div>
   <div class="time"></div>
   <div class="calendar xxsmall"></div>
  </div> 
  <div class="top right">
   <div class="windsun small dimmed"></div>
   <div class="temp"></div>
   <div class="temhum medium"></div>
   <div class="forecast small dimmed"></div>
   <div class="suggestion small dimmed"></div>
   <div class="updatetime xsmall dimmed"></div>
  </div> 
  <div class="center-ver center-hor">
   <!-- <div class="dishwasher light">Vaatwasser is klaar!</div> -->
  </div> 
  <div class="lower-third center-hor">
   <div class="compliment light"></div>
  </div> 
  <div class="bottom center-hor">
   <div class="news medium"></div>
  </div>  
  <script src="js/jquery.js"></script> 
  <script src="js/jquery.feedToJSON.js"></script> 
  <script src="js/ical_parser.js"></script> 
  <script src="js/moment-with-locales.min.js"></script> 
  <script src="js/paho/mqttws31.js"></script> 
  <script src="js/config.js"></script> 
  <script src="js/rrule.js"></script> 
  <script src="js/version/version.js" type="text/javascript"></script> 
  <script src="js/calendar/calendar.js" type="text/javascript"></script> 
  <script src="js/compliments/compliments.js" type="text/javascript"></script> 
  <script src="js/skycons.js" type="text/javascript"></script> 
  <script src="js/weather/weather.js" type="text/javascript"></script> 
<!--   <script src="js/temp_hum/tem_hum.js" type="text/javascript"></script>  -->
<!--   <script src="js/Tools/Tools.js" type="text/javascript"></script> 
 -->  <script src="js/time/time.js" type="text/javascript"></script> 
  <script src="js/news/news.js" type="text/javascript"></script> 
  <script src="js/main.js?nocache=<?php echo md5(microtime()) ?>"></script> 
  <script src="js/socket.io.min.js"></script>  
  <script language="javascript">
    setTimeout("self.location.reload();",1000000); 
  </script> 
  <?php  include(dirname(__FILE__).'/controllers/modules.php');?>
 </body>
</html>