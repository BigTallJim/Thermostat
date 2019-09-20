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

  function getCityWeather(city){
    $.get("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=69312a7de5429a8d9bdbc71b2e7d1710", function(getWeather) {
      weather = getWeather.name + ": " + getWeather.main.temp + "&#176";
      updateScreen();
    });
  };
});

