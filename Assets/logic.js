

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
    $("#temp").append(getTemp + " F");

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




function appendBtns(savedBtns, localSavedBtns) {
    if (localSavedBtns != null) {


        for (var i = 0; i < localSavedBtns.length; i++) {
            savedBtns.push(localSavedBtns[i]);
        }
        console.log(savedBtns);
        for (var i = 0; i < savedBtns.length; i++) {
            var newBtn = $("<button>");
            newBtn.attr("data-name", savedBtns[i])
            newBtn.append(savedBtns[i]);
            newBtn.addClass("savedBtnStyle");
            $("#newBtnSearch").append(newBtn);

            savedBtnClicked(newBtn);
        }
    }
    else {
        console.log("savedBtns is empty");
    }
}

function savedBtnClicked(newBtn) {
    $(newBtn).click(function () {
        var getSavedBtnVal = $(this).attr("data-name");
        console.log(getSavedBtnVal);
    })
}