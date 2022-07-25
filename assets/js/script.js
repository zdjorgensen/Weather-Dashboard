var previousSearch = document.querySelector('.previous-search');
var previousList = document.getElementById('previous-list');
var uvColor = $(".uv-color");
var apiKey = "d90c570eff9716afb2d29265fa851068";

// https://www.youtube.com/watch?v=nGVoHEZojiQ&ab_channel=SteveGriffith-Prof3ssorSt3v3 OpenWeatherMap Api help src

// Gets items from local storage and passes it to createLi
function init() {
    for(var i = 0; i<localStorage.length; i++) {
        var storedKey = localStorage.key(i);
        if(storedKey !== null){
            createLi(storedKey);
        }
    }
}

// Creates and li element for each city searched and adds it to local storage
function createLi (cityName) {
    var li = document.createElement("li");
    li.textContent = cityName;
    previousSearch.appendChild(li);
}

// Calls getCity and createLI once user has searched for a city
$('#location-search').on('click', function (event) {
    event.preventDefault();
    var cityName = $('#city-name').val().trim();
    getCity(cityName);
    localStorage.setItem(cityName, JSON.stringify(cityName));
});

// Calls getCity once a previous searched city has been clicked
previousSearch.addEventListener('click', function (event) {
    var element = event.target;
    var previousCity = element.innerHTML;
    getCity(previousCity);
});

// Gets the city name, date, and icon after the search button or previous search is clicked
function getCity (cityName) {
    var city = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;

    fetch(city)
    .then(function (response) {
        if(response.status !== 200){
            alert("Not a city! Double check your spelling");
            return;
        } else {
            return response.json();
        }
    })
    .then(function (data) {
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        var currDay = new Date(data.dt * 1000).toLocaleDateString();
        $('#curr-day').text(data.name + ",  " + currDay);
        getWeather(lat, lon);
        createLi(cityName)
    });
}

// Gets the temp, wind, humidity, and uv index for the city
function getWeather (lat, lon){
    var weather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=hourly,minutely&appid=" + apiKey;

    fetch(weather)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var currTemp = data.current.temp;
        var currHum = data.current.humidity;
        var currUV = data.current.uvi;
        var currWind = data.current.wind_speed;
        var icon = data.current.weather[0].icon;
        var iconSrc = "http://openweathermap.org/img/wn/" + icon + ".png";
      
        $('#curr-img').attr('src', iconSrc);
        $('#curr-temp').text('Temp: ' + currTemp);
        $('#curr-wind').text('Wind: ' + currWind + " MPH");
        $('#curr-hum').text('Humidity: ' + currHum);
        
        // Checks to see if uv index is low, moderate, high, very high, or extreme
        if(currUV < 2) {
            $('#curr-uv').text('UV Index: ');
            $('#curr-uv').append(uvColor);
            $('.uv-color').addClass('low')
            $('.uv-color').text(currUV);
        } else if(currUV > 2 && currUV <= 5) {
            $('#curr-uv').text('UV Index: ');
            $('#curr-uv').append(uvColor);
            $('.uv-color').addClass('moderate')
            $('.uv-color').text(currUV);
        } else if(currUV > 5 && currUV <= 7) {
            $('#curr-uv').text('UV Index: ');
            $('#curr-uv').append(uvColor);
            $('.uv-color').addClass('high')
            $('.uv-color').text(currUV);
        } else if(currUV > 7 && currUV <= 10) {
            $('#curr-uv').text('UV Index: ');
            $('#curr-uv').append(uvColor);
            $('.uv-color').addClass('very-high')
            $('.uv-color').text(currUV);
        } else {
            $('#curr-uv').text('UV Index: ');
            $('#curr-uv').append(uvColor);
            $('.uv-color').addClass('extreme')
            $('.uv-color').text(currUV);
        };
        
        getForecast(lat, lon);
    });
};

// Gets the 5 day forecast
function getForecast(lat, lon) {
    var weather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=hourly,minutely&appid=" + apiKey;

    fetch(weather)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for(var i = 1; i<6; i++){
            $('.forecast').each(function () {
                var date =  new Date(data.daily[i].dt * 1000).toLocaleDateString();
                var icon = data.daily[i].weather[0].icon;
                var temp = data.daily[i].temp.day;
                var hum = data.daily[i].humidity;
                var wind = data.daily[i++].wind_speed;
                var iconSrc = "http://openweathermap.org/img/wn/" + icon + ".png";
                $(this).find("#future-date").text(date);
                $(this).find("#future-img").attr('src', iconSrc);
                $(this).find("#future-temp").text('Temp: ' + temp);
                $(this).find("#future-wind").text('Wind: ' + wind);
                $(this).find("#future-hum").text('Humidity: ' + hum);
            });
        }
    });
};

init();