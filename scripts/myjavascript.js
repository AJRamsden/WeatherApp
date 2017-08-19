$(document).ready(function() {
  var name = "";
  var weatherConditions = [];
  var temp = 0;
  var test = [];

  //Get weather details here
  $("#testButton").on("click",function(){
    $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=-25&lon=25", function(val){
      name = (val.name);
      weatherConditions = (val.weather[0]);
      temp = val.main.temp;
      test = val;

      alert(temp);
    });
  });

  //Convert temp here
  $("#testTemp").on("click",function(){
    temp = temp * 6;
    var myTime = new Date();
    alert(myTime.getHours() + ":" + myTime.getMinutes());
  });

});//End of ducment ready function test
