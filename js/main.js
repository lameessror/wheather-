var searchInput = document.getElementById("search_input");
var confirmSearchBtn = document.querySelector(".confirm_search_btn");

var dayName = document.querySelector(".day_name");
var dayDate = document.querySelector(".day_date");

var cityName = document.querySelector(".city_name");

var weatherDsgree = document.querySelector(".weather_degree");

var conditionIcon = document.querySelector(".status_icon");

var conditionDescription = document.querySelector(".status_condition");

var cards_container = document.querySelector("#allData");



function getData(selectedLocation) {
    var myhttp = new XMLHttpRequest();
    myhttp.open("GET",` http://api.weatherapi.com/v1/forecast.json?key=08bc2fa0d1cf403e81e110844241601&q=${selectedLocation}&days=3`);
    myhttp.send();
    myhttp.addEventListener("readystatechange", function () {
    if (myhttp.readyState == 4 && myhttp.status == 200) {
    console.log(JSON.parse(myhttp.response));
    displayData(JSON.parse(myhttp.response));
}
});
}

// async function getData(selectedLocation){
// let weathearResponse = await fetch(` http://api.weatherapi.com/v1/forecast.json?key=08bc2fa0d1cf403e81e110844241601&q=${selectedLocation}&days=3`);
// let weathearData = await weathearResponse.json()
// console.log(weathearData)
// displayData();
// return weathearData;
// }

getData("Cairo");

function displayData(x){
    var date1 = new Date(x.forecast.forecastday[0].date);
    var date2 = new Date(x.forecast.forecastday[1].date);
    var date3 = new Date(x.forecast.forecastday[2].date);
    var times = [];
  
    for (var i = 0; i < x.forecast.forecastday[0].hour.length; i++) {
      var dateString = x.forecast.forecastday[0].hour[i].time;
      var dateObject = new Date(dateString);
      var hours = dateObject.getHours();
      var minutes = dateObject.getMinutes();
  
      var formattedTime =
        (hours < 10 ? "0" : "") +
        hours +
        ":" +
        (minutes < 10 ? "0" : "") +
        minutes;
  
      times.push(formattedTime);
    }
  
    // console.log(times);
    cartona = `
    <div class="col-md-4 ">
    <div class="single_card rounded-3 ">
      <div
        class="date_container d-flex justify-content-between align-items-center p-2 rounded">
        <span class="day_name text-uppercase">${date1.toLocaleString("en-us", { weekday: "long", })}
         
       </span>
        <span class="day_date text-capitalize">${
          x.forecast.forecastday[0].date
        }</span>
      </div>
      <div class="city_name mt-2 ms-3 fs-2 text-white">${x.location.name}</div>
      <div
        class=" d-flex flex-column align-items-center justify-content-evenly py-1">
        <img
          src="${x.current.condition.icon}"
          alt="..."
          class="status_icon_  " />
        <h1 class="weather_degree_td">${
          x.current.temp_c
        }<span class = "text-info">&degC</span></h1>
        
      </div>
 
      <div class="status_condition p-2 mt-2 rounded ">${
        x.current.condition.text
      }</div>
 
      <div
        class="weather_sammary d-flex justify-content-around align-items-center mt-2 p-2">
        <span class="text-white-50"><i class="fa-solid fa-umbrella me-2 text-white"></i> ${
          x.current.precip_mm * 100
        }% </span>
        <span class="text-white-50"><i class="fa-solid fa-wind me-2 text-white"></i> ${
          x.current.wind_kph
        } km/h</span>
        <span class="text-white-50"> <i class="fa-solid fa-compass me-2 text-white"></i> ${
          x.current.wind_dir
        }</span>
      </div>
    </div>
  </div>
 
 
 
 
  <div class="col-md-4 ">
    <div class="single_card rounded-3">
<div class="date_container d-flex justify-content-center align-items-center p-2 rounded">
        <span class="day_name text-uppercase">${date2.toLocaleString("en-us", {
          weekday: "long",
        })}</span>
        
      </div>
     
      <div
        class=" d-flex flex-column align-items-center justify-content-evenly py-4 mt-2">
 
        <img
          src="${x.forecast.forecastday[1].day.condition.icon}"
          alt="..."
          class="status_icon  w-25" />
 
          <h1 class="weather_degree text-white-50">${
            x.forecast.forecastday[1].day.maxtemp_c
          }<span class = "text-info">&degC</span></h1>
          <h5 class="weather_degree_min ">${
            x.forecast.forecastday[1].day.mintemp_c
          }&deg</h5>
          
      </div>
 
      <div class="status_condition p-2 mt-3 rounded">${
        x.forecast.forecastday[1].day.condition.text
      }
      </div>
      <div class="mt-2 p-3"></div>
      
    </div>
  </div>
 
  <div class="col-md-4 ">
    <div class="single_card rounded-3">
      <div
        class="date_container d-flex justify-content-center align-items-center p-2 rounded">
        <span class="day_name text-uppercase">${date3.toLocaleString("en-us", {
          weekday: "long",
        })}</span>
        
      </div>
     
      <div
        class=" d-flex flex-column align-items-center justify-content-evenly py-4 mt-2">
 
        <img
          src="${x.forecast.forecastday[2].day.condition.icon}"
          alt="..."
          class="status_icon  w-25" />
 
          <h1 class="weather_degree text-white-50">${
            x.forecast.forecastday[2].day.maxtemp_c
          }<span class = "text-info">&degC</span></h1>
          <h5 class="weather_degree_min ">${
            x.forecast.forecastday[2].day.mintemp_c
          }&deg</h5>
      </div>
 
      <div class="status_condition p-2 mt-3 rounded">${
        x.forecast.forecastday[2].day.condition.text
      }
      </div>
 
      <div class="mt-2 p-3"></div>
    </div>
  </div>`;
  cards_container.innerHTML = cartona;

}


//    !========== Location =====


confirmSearchBtn.addEventListener("click", function () {
    console.log(searchInput.value);
    if (searchInput.value == "") {
      
      getData("Cairo");
    }
    getData(searchInput.value);
  });
  

