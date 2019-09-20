thermostat = new Thermostat();

$(document).ready(function(){
  getCityWeather("London");
  updateScreen();

  $("#upButton").click(function(event){
    thermostat.up(1);
    updateScreen();
  });

  $("#downButton").click(function(event){
    thermostat.down(1);
    updateScreen();
  });

  $("#reset").click(function(event){
    thermostat.reset();
    updateScreen();
  });

  $("#powerSave").click(function(event){
    if (thermostat.powerSave === false){
      thermostat.setPowerSave(true);
    }else{
      thermostat.setPowerSave(false);
    }
    updateScreen();
  });

  $("#cities").change(function(){
    var selectedCity = $("#cities").val();
    getCityWeather(selectedCity);
  });

  function updateScreen(){
      updateBoxes();
      $("#temperature").html(thermostat.temperature + "&#176");
      $("#settings").html(thermostat.powerSaveDisplay());
      $("#energyLevel").html(thermostat.currentUsage());
      if(thermostat.currentUsage()==='high-usage'){
        $("#energyLevel").css('color','red');
      } else if (thermostat.currentUsage()==='low-usage'){
        $("#energyLevel").css('color','green');
      } else {
        $("#energyLevel").css('color','orange');
      };
      $("#weather").html(weather);
  };

  function updateBoxes(){
    temp = thermostat.temperature;
    blankAllBoxes();
    if (temp >= 10){$("#temp10").css("background-color", "red");}
    if (temp >= 12){$("#temp9").css("background-color", "red");}
    if (temp >= 14){$("#temp8").css("background-color", "red");}
    if (temp >= 16){$("#temp7").css("background-color", "red");}
    if (temp >= 18){$("#temp6").css("background-color", "red");}
    if (temp >= 20){$("#temp5").css("background-color", "red");}
    if (temp >= 22){$("#temp4").css("background-color", "red");}
    if (temp >= 24){$("#temp3").css("background-color", "red");}
    if (temp >= 26){$("#temp2").css("background-color", "red");}
    if (temp >= 28){$("#temp1").css("background-color", "red");}

  }

  function blankAllBoxes(){
    $("#temp1").css("background-color", "green");
    $("#temp2").css("background-color", "green");
    $("#temp3").css("background-color", "green");
    $("#temp4").css("background-color", "green");
    $("#temp5").css("background-color", "green");
    $("#temp6").css("background-color", "green");
    $("#temp7").css("background-color", "green");
    $("#temp8").css("background-color", "green");
    $("#temp9").css("background-color", "green");
    $("#temp10").css("background-color", "green");
  }

  function getCityWeather(city){
    $.get("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=69312a7de5429a8d9bdbc71b2e7d1710", function(getWeather) {
      weather = getWeather.name + ": " + getWeather.main.temp + "&#176";
      updateScreen();
    });
  };
});

