var locationSearch = $("#location-search");
var locationUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=40.760780&lon=-111.891045&units=imperial&appid=d90c570eff9716afb2d29265fa851068"



fetch(locationUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        // debugger;
        var test = data.current.temp;
        console.log(test);

    });