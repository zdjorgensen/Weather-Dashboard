var uvColor = $(".uv-color");
var apiKey = "d90c570eff9716afb2d29265fa851068";

$(document).ready(function () {

    // Gets the city name, date, and icon after the search button is clicked
    $('#location-search').on('click', function (event) {
        event.preventDefault();
        var cityName = $('#city-name').val().trim();
        
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
            console.log(data);
            var icon = data.weather[0].icon;
            var imgSrc = ("http://openweathermap.org/img/wn/" + icon + ".png");
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var currDay = new Date(data.dt * 1000).toLocaleDateString();
            
            console.log(currDay, data.dt)
            $('#curr-day').text(data.name + ",  " + currDay + " " + imgSrc);
            getWeather(lat, lon);

        });
        // todo: safe to local storage and call function to add to li 

    });

    // Gets the temp, wind, humidity, and uv index for the city
    function getWeather (lat, lon){
        var weather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=hourly,minutely&appid=" + apiKey;

        fetch(weather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var currTemp = data.current.temp;
            var currHum = data.current.humidity;
            var currUV = data.current.uvi;
            var currWind = data.current.wind_speed;
            // var currIcon = data.current.weather[0].icon;
            // var currDate = new Date(data.current.dt * 1000); 

            $('#curr-temp').text('Temp: ' + currTemp);
            $('#curr-wind').text('Wind: ' + currWind + " MPH");
            $('#curr-hum').text('Humidity: ' + currHum);
            
            if(currUV < 2) {
                $('#curr-uv').text('UV Index: ');
                $('#curr-uv').append(uvColor);
                $('.uv-color').addClass('low')
                $('.uv-color').text(currUV);
            }
            if(currUV > 2 && currUV <= 5) {
                $('#curr-uv').text('UV Index: ');
                $('#curr-uv').append(uvColor);
                $('.uv-color').addClass('moderate')
                $('.uv-color').text(currUV);
            }
            if(currUV > 5 && currUV <= 7) {
                $('#curr-uv').text('UV Index: ');
                $('#curr-uv').append(uvColor);
                $('.uv-color').addClass('high')
                $('.uv-color').text(currUV);
            }
            if(currUV > 7 && currUV <= 10) {
                $('#curr-uv').text('UV Index: ');
                $('#curr-uv').append(uvColor);
                $('.uv-color').addClass('very-high')
                $('.uv-color').text(currUV);
            }
            if(currUV >= 11) {
                $('#curr-uv').text('UV Index: ');
                $('#curr-uv').append(uvColor);
                $('.uv-color').addClass('extreme')
                $('.uv-color').text(currUV);
            }
            
            getForecast(lat, lon);
        });
    }

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
                    console.log(date, temp, hum, wind, icon);
                    $(this).find("#future-date").text(date);
                    $(this).find("#future-icon").text(icon);
                    $(this).find("#future-temp").text('Temp: ' + temp);
                    $(this).find("#future-wind").text('Wind: ' + wind);
                    $(this).find("#future-hum").text('Humidity: ' + hum);
                    // debugger;
                });
            }
        })
    }
});


// function getStorage() {
//     for(var i = 0; i<localStorage.length; i++) {
//         var storedKey = localStorage.key(i);
//         var storedValue = localStorage.getItem(storedKey);
//         $('.time-block').each(function () {
//             var time = $(this).attr('id');
//             if(time == storedKey){
//                 $(this).find(".description").val(storedValue);
//                 return false;
//             } else {
//                 return;
//             }
//         }
//     )};
// }
// getStorage();