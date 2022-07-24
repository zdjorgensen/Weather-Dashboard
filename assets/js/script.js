var locationSearch = $("#location-search");


// var locationUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=40.760780&lon=-111.891045&units=imperial&appid=" + apiKey;

// var city = "Salt Lake City"
// var testLink = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;


// link q= 
$(document).ready(function () {

// fetch(testLink)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//         // debugger;
//         // var test = data.current.temp;
//         // console.log(test);

//     });

    // Gets the city name after the search button is clicked
    $('#location-search').on('click', function (event) {
        event.preventDefault();
        var cityName = $('#city-name').val().trim();
        var apiKey = "d90c570eff9716afb2d29265fa851068";
        var testLink = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;

        fetch(testLink)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
            console.log(data);
            // debugger;
            // var test = data.current.temp;
            // console.log(test);

        });
    
        
        // todo: safe to local storage and call function to add to li 
        console.log(location, testLink);

    });
});