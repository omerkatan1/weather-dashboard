
function generateAllWeather(currentWeatherURL) {
    $.ajax({
        url: currentWeatherURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);



        if (savedBtns != null) {
            if(!savedBtns.includes(response.name)) {
                savedBtns.push(response.name);
            }
            else {
                console.log("savedBtns already includes that city");
            }
            localStorage.setItem("savedCitys", JSON.stringify(savedBtns));
        } else {
            console.log("saved buttons is empty");
        }
        
        $("#newBtnSearch").empty();
        appendBtns();

        // all the current weather info function
        currentWeatherInfo(response);

    });
}



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
        $("#UVindex").append("UV index: " + getUvIndex);
    });


    var fiveDayQueryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + key;


    $.ajax({
        url: fiveDayQueryURL,
        method: "GET"
    }).then(function (fiveDayResponse) {
        console.log(fiveDayResponse);

        $("#fiveDayBox").empty();

        var newTitle = $("<h3>");
        newTitle.append("Five Day Forcast")
        newTitle.attr("id", "fiveDayForcastTitle");
        $("#fiveDayBox").append(newTitle);

        for (var i = 0; i < 5; i++) {
            var fiveDates = moment().add(1 + i, 'day').format('L');
            var datePar = $("<p>");
            datePar.css("font-weight", "bolder");
            datePar.css("font-size", "20px");
            datePar.append(fiveDates);

            var fiveIconURL = "http://openweathermap.org/img/wn/" + fiveDayResponse.list[i].weather[0].icon + ".png";
            var iconImg = $("<img>");
            iconImg.attr("src", fiveIconURL);



            var getTempX5 = fiveDayResponse.list[i].main.temp;
            var tempPar = $("<p>");
            tempPar.css("font-size", "18px");
            tempPar.css("color", "black");
            tempPar.css("text-align", "left");
            tempPar.append(getTempX5 + " F");

            var getHumidityX5 = fiveDayResponse.list[i].main.humidity;
            var humidityPar = $("<p>");
            humidityPar.css("text-align", "left");
            humidityPar.append("Humidity: " + getHumidityX5 + "%");


            var newDiv = $("<div>");
            newDiv.addClass("fiveDayBoxStyle");
            newDiv.append(datePar);
            newDiv.append(iconImg);
            newDiv.append(tempPar);
            newDiv.append(humidityPar);


            $("#fiveDayBox").append(newDiv);





        }
    });


}




function appendBtns() {
        if (localSavedBtns != null) {

            for (var i = 0; i < localSavedBtns.length; i++) {
                if (!savedBtns.includes(localSavedBtns[i])) {
                    savedBtns.push(localSavedBtns[i]);
                }
                else {
                    console.log("saved buttons array already contains that city");
                }
            }


            for (var i = 0; i < savedBtns.length; i++) {
                var newBtn = $("<button>");
                newBtn.attr("data-name", savedBtns[i]);
                newBtn.append(savedBtns[i]);
                newBtn.addClass("savedBtnStyle");
                $("#newBtnSearch").prepend(newBtn);

                savedBtnClicked(newBtn);
            }
        }
        else {
            console.log("savedBtns is empty");
        }
}

function savedBtnClicked(newBtn) {
    $(newBtn).click(function () {

        var keyBtn = "f2c5c8025ab4a4cc77dc112a270a04b9";
        var cityBtn = $(this).attr("data-name");
        var currentWeatherBtnURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityBtn + "&units=imperial&appid=" + keyBtn;

        $.ajax({
            url: currentWeatherBtnURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            // all the current weather info function
            currentWeatherInfo(response);

        });

    })
}