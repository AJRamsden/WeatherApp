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
var minutes = 0;
var weatherDate = new Date();
var test ="";

var month = [];
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

var day = [];
day[0] = "Sunday";
day[1] = "Monday";
day[2] = "Tuesday";
day[3] = "Wednesday";
day[4] = "Thursday";
day[5] = "Friday";
day[6] = "Saturday";


$(document).ready(function() {

if(time.getMinutes() < 10){
  minutes = "0" + time.getMinutes();
}
else{
  minutes = time.getMinutes();
}
  //Get time
  time = time.getHours() + ":" + minutes;

  weatherDate = day[weatherDate.getDay()] + ", " + weatherDate.getDate() + " " + month[weatherDate.getMonth()];

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

          $("#time").text(time);
          $("#date").text(weatherDate);
          $("#name").text(name);
          $("#temp").text(tempCurrent);
          $("#mainWeather").text(weatherConditions.main + ", " + weatherConditions.description);
          //$("#weatherIcon").text(weatherConditions.icon);
          $("#weatherDetails").removeClass("hideWeatherContainer");


      });
      //Get country name
      $.getJSON("http://country.io/names.json&callback=?", function(country){
        test = country.this_countryCode;
        //alert(test);
      });
    });
  }
  else{
    alert("Geolocation is not supported by this browser.");
  }



  if(time > "05:00" && time < "12:00")
  {
    $("#picBody").removeClass("bodyAfternoon")
    $("#picBody").removeClass("bodyNight")
    $("#picBody").addClass("bodyMorning")
    //alert("true");
  }
  else if (time > "12:00" & time < "23:00")
  {
    $("#picBody").removeClass("bodyMorning")
    $("#picBody").removeClass("bodyNight")
    $("#picBody").addClass("bodyAfternoon")
  }
  else
  {
    $("#picBody").removeClass("bodyMorning")
    $("#picBody").removeClass("bodyAfternoon")
    $("#picBody").addClass("bodyNight")
    //alert("false");
  }

  //Convert temp on anchor click (celcius to farnheit)
  $("#testTemp").on("click",function(){
    temp = temp * 6;
  });
});//End of ducment ready function test
