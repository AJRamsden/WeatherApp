//VARIABLES
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
var hours = 0;
var weatherDate = new Date();
var test ="";
var measurementName = "Celsius";

//MONTHS ARRAY FOR WEATHER DATE
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

//DAY OF WEEK ARRAY FOR WEATHER DATE
var day = [];
day[0] = "Sunday";
day[1] = "Monday";
day[2] = "Tuesday";
day[3] = "Wednesday";
day[4] = "Thursday";
day[5] = "Friday";
day[6] = "Saturday";

//GET HOURS TO DETERMINE THE BACKGROUND IMAGE - USED IN IF STATEMENT BELOW
hours = time.getHours();

$(document).ready(function() {

//GET MINUTE TO ADD 0 IF SMALLER THAN 10 MINUTES
if(time.getMinutes() < 10){
  minutes = "0" + time.getMinutes();
}
else{
  minutes = time.getMinutes();
}
  //THE CURRENT TIME DISPLAYED ON PAGE
  time = time.getHours() + ":" + minutes;

  //THE DATE IN FORMAT NAMEOFDAY,/ DATE/ MONTH
  weatherDate = day[weatherDate.getDay()] + ", " + weatherDate.getDate() + " " + month[weatherDate.getMonth()];

  //ASK FOR LOCATION PERMISSION FOR WEATHER API CALL
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function (position){
      locationLat = position.coords.latitude;
      locationLong = position.coords.longitude;
      //MAKE API CALL TO GET THE WEATHER USING THE LOCATION OF THE USER
      $.getJSON(weatherAPIURL + "lat=" + locationLat + "&lon=" + locationLong, function(val){
        name = val.name;
        weatherConditions = val.weather[0];
        tempCurrent = Math.round(val.main.temp);
        tempMax = val.main.temp_max;
        tempMin = val.main.temp_min;
        countryCode = val.sys.country.toUpperCase();
          //BIND THE DATA TO THE HTML
          $("#time").text(time);
          $("#date").text(weatherDate);
          $("#name").text(name);
          $("#temp").text(tempCurrent);
          $("#mainWeather").text(weatherConditions.main + ", " + weatherConditions.description);
          $("#weatherDetails").removeClass("hideWeatherContainer");
          $("#changeTemp").text(measurementName);
          $("#footerContainer").removeClass("hidefooterContainer");
      });
      //GET THE COUNTRY NAME USING THE COUNTRY CODE RETURNED BY THE WEATHER API
      $.getJSON("http://country.io/names.json&callback=?", function(country){
        test = country.this_countryCode;
      });
    });
  }
  else{
    alert("Geolocation is not supported by this browser.");
  }
  //SET THE BACKGROUND IMAGE OF THE PAGE ACCORDING TO THE CURRENT TIME
  if(hours > 5 && hours < 12)
  {
    $("#picBody").removeClass("bodyAfternoon")
    $("#picBody").removeClass("bodyNight")
    $("#picBody").addClass("bodyMorning")
    //alert("true");
  }
  else if (hours > 12 & hours < 19)
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
  $("#changeTemp").on("click",function(){
    var currentFormat = document.getElementById("changeTemp").text;

    if(currentFormat == "Celsius"){
      var tempConverToF = parseInt(tempCurrent);
      tempConverToF = tempConverToF * (9 / 5) + 32;
      $("#temp").text(Math.round(tempConverToF));
        $("#changeTemp").text("Fahrenheit");
    }
    else
    {
        $("#temp").text(tempCurrent);
        $("#changeTemp").text("Celsius");
    }
  });

  function updateTime(){
    var timeNow = new Date();
    var updateMinutes = timeNow.getMinutes();

    if(updateMinutes < 10){
      updateMinutes = "0" + timeNow.getMinutes();
      $("#time").text(timeNow.getHours() + ":" + updateMinutes);
      setTimeout(updateTime, 1000);
    }
    else{
      var updateMinutes = timeNow.getMinutes();
      $("#time").text(timeNow.getHours() + ":" + updateMinutes);
      setTimeout(updateTime, 20000);
    }
  }
  updateTime();



});//End of ducment ready function test

function setBackground(timeSelected){
  switch(timeSelected.id){
    case "Morning":
    $("#picBody").removeClass("bodyAfternoon");
    $("#picBody").removeClass("bodyNight");
    $("#picBody").addClass("bodyMorning");
    break;
    case "Afternoon":
    $("#picBody").removeClass("bodyMorning");
    $("#picBody").removeClass("bodyNight");
    $("#picBody").addClass("bodyAfternoon");
    break;
    case "Evening":
    $("#picBody").removeClass("bodyAfternoon");
    $("#picBody").removeClass("bodyMorning");
    $("#picBody").addClass("bodyNight");
    break;
  }
}
