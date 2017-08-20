var weatherAPIURL = "https://fcc-weather-api.glitch.me/api/current?";
var name = "";
var weatherConditions = [];
var tempCurrent = 0;
var tempMax = 0;
var tempMin = 0;
var locationLat = "";
var locationLong = "";
var countryCode = "";
var time = new Date();
var test ="";

$(document).ready(function() {

  //Get time
  time = time.getHours() + ":" + time.getMinutes();

  //Ask for location permission get weather data from api
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function (position){
      locationLat = position.coords.latitude;
      locationLong = position.coords.longitude;
      //Get weather data from api
      $.getJSON(weatherAPIURL + "lat=" + locationLat + "&lon=" + locationLong, function(val){
        name = val.name;
        weatherConditions = val.weather[0];
        tempCurrent = val.main.temp;
        tempMax = val.main.temp_max;
        tempMin = val.main.temp_min;
        countryCode = val.sys.country.toUpperCase();
        alert(tempCurrent + " / " + tempMax + " / " + tempMin  + " " + name + ", " + countryCode + " " + time);
      });
      //Get country name
      $.getJSON("http://country.io/names.json&callback=\?", function(country){
        test = country.countryCode;
        alert(test);
      });
    });
  }
  else{
    alert("Geolocation is not supported by this browser.");
  }

  //Convert temp on anchor click (celcius to farnheit)
  $("#testTemp").on("click",function(){
    temp = temp * 6;
  });

});//End of ducment ready function test
