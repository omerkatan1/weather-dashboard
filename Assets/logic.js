

function currentWeatherInfo(response) {
    // city name stuff
    var getCity = response.name;
    $("#city").empty();
    $("#city").append(getCity);

    // data and time stuff
    var getDate = moment().format('ll');
    $("#date").empty();
    $("#date").append(getDate);

    // temp stuff
    var getTemp = parseInt(response.main.temp);
    $("#temp").empty();
    $("#temp").append(getTemp + " °F");

    // humidity stuff
    var getHumidity = response.main.humidity;
    $("#humidity").empty();
    $("#humidity").append("Humidity: " + getHumidity + " %");


    //wind speed stuff
    var getSpeed = response.wind.speed;
    $("#windspeed").empty();
    $("#windspeed").append("Windspeed: " + getSpeed + " mph");

    // icon stuff
    var getIconURL = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
    $("#iconHolder").attr("src", getIconURL);



    var lat = response.coord.lat;
    var lon = response.coord.lon;

    var uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + key + "&lat=" + lat + "&lon=" + lon;


    $.ajax({
        url: uvQueryURL,
        method: "GET"
    }).then(function (uvResponse) {

        var getUvIndex = uvResponse[0].value;

        $("#UVindex").empty();
        $("#UVindex").prepend("UV index: " + getUvIndex);


    });
}

var city = $("#cityNameSubmit").val();


// this function makes buttons appear after page is refreshed
function getSavedButtons(savedCitys, savedCityParse) {
    $("#newBtnSearch").empty();
    if (savedCityParse != null) {
        for (var i = 0; i < savedCityParse.length; i++) {
            savedCitys.push(savedCityParse[i]);
            var newBtn = $("<button>");
            newBtn.attr("data-name", savedCitys[i]);
            newBtn.addClass("savedBtnStyle");
            newBtn.addClass("searchBtn");
            newBtn.append(savedCitys[i]);
            $("#newBtnSearch").append(newBtn);

            savedBtnOnClick();
        }
    }
    else {
        console.log("savedCityParse is empty");
    }
    console.log(savedCitys);
}

// this function makes sure the button appears without having to refresh the page
function updateSavedButtons(savedCitys) {
    $("#newBtnSearch").empty();
    for(var i = 0; i < savedCitys.length; i++) {
        var newBtnUpdate = $("<button>");
        newBtnUpdate.attr("data-name", savedCitys[i]);
        newBtnUpdate.addClass("savedBtnStyle");
        newBtnUpdate.addClass("searchBtn");
        newBtnUpdate.append(savedCitys[i]);
        $("#newBtnSearch").append(newBtnUpdate)

        savedBtnOnClick();
    }
}


function savedBtnOnClick() {

    $(".searchBtn").click(function() {
        var getBtnText = $(this).attr("data-name");
        city = getBtnText;
    });
}