// const express = require("express");
// const moment = require("moment");
// const momentTimezone = require("moment-timezone");

var searchHistory = [];
//OpenWeather API root and key

var weatherApiRootUrl = 'https://api.openweathermap.org';
var weatherApiKey = 'cf30aa7d4098c837bc982a675f853adc';

var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var searchHistoryContainer = document.querySelector('#history');

//Current Forecast
var todayContainer = document.querySelector('#today');

//5-Day Forecast
var forecastContainer = document.querySelector('#forecast');
var searchButton = document.querySelector('#search-button');

var dayOne1 = document.querySelector(".dayOne")
var dayTwo2 = document.querySelector(".dayTwo")
var dayThree3 = document.querySelector(".dayThree")
var dayFour4 = document.querySelector(".dayFour")
var dayFive5 = document.querySelector(".dayFive")
var todayDate = document.querySelector(".currentDay")
var city = document.querySelector(".name");
var weather = document.querySelector(".currentWeather");



//search
    //render
        function renderSearchHistory() {
            searchHistoryContainer.innerHTML = '';

            for (let i = searchHistory.length - 1; i >= 0; i--) {
                var btn = document.createElement('button');
                btn.setAttribute('type', 'button');
                btn.setAttribute('aria-controls', 'today forecast');
                btn.classList.add('history-btn', 'btn-history');

                btn.setAttribute('data-search', searchHistory[i]);
                btn.textContent = searchHistory[i];
                searchHistoryContainer.append(btn);

            //setting date and time
            if(response.list[i].dt_txt.split(" ")[1] == "15:00:00")
            {
                //if time of report is 3pm, populate text areas accordingly
                let day = response.list[i].dt_txt.split("-")[2].split(" ")[0];
                let month = response.list[i].dt_txt.split("-")[1];
                let year = response.list[i].dt_txt.split("-")[0];
                $("#" + day_number + "date").text(month + "/" + day + "/" + year); 
                let temp = Math.round(((response.list[i].main.temp - 273.15) *9/5+32));
                $("#" + day_number + "five_day_temp").text("Temp: " + temp + String.fromCharCode(176)+"F");
                $("#" + day_number + "five_day_humidity").text("Humidity: " + response.list[i].main.humidity);
                $("#" + day_number + "five_day_icon").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                console.log(response.list[i].dt_txt.split("-"));
                console.log(day_number);
                console.log(response.list[i].main.temp);
                day_number++; 
                        }   
                 }
            }


    //append
        function appendToHistory(search) {
            searchHistory.push(search);
            localStorage.setItem('search-history', JSON.stringify(searchHistory));
            renderSearchHistory();
        }

    //init
    function initSearchHistory() {
        var storedHistory = localStorage.getItem('search-history');
        if (storedHistory) {
            searchHistory = JSON.parse(storedHistory);
        }
        renderSearchHistory();
    }

//forecast

    //render current forecast
        searchButton.addEventListener("click", renderCurrentWeather (city, weather));

        // function renderCurrentWeather(city, weather, timezone) {

        function renderCurrentWeather(city, weather) {
            fetch(`${weatherApiRootUrl}/data/2.5/weather?q=${searchInput}&appid=${weatherApiKey}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                var tempF = weather.temp; 
                var windMph = weather.wind_speed;
                var humidity = weather.humidity;
                var uvi = weather.uvi;

                var card = document.createElement('div');
                var cardBody = document.createElement('div');
                var heading = document.createElement('h2');
                var tempEl = document.createElement('p');
                var windEl = document.createElement('p');
                var humidityEl = document.createElement('p');
                var uviEl = document.createElement('p');
                var uviBadge = document.createElement('button');

                //add innerHTML 
                nameEl.innerHTML = nameValue;
                tempEl.innerHTML = tempValue;
                windEl.innerHTML = windValue;
                humidityEl.innerHTML = humidityValue;
                uviEl.innerHTML = uvIndexValue;
                todayDate.innerHTML = currentDate;
                
            })

    //5-day forecast 
    searchButton.addEventListener("click", renderForecast());
    
    function renderForecast() {
        fetch(`${weatherApiRootUrl}/data/2.5/weather?q=${searchInput}&appid=${weatherApiKey}`)
        .then(response => response.json())
            .then(data => {
                console.log(data)
        })

        function renderForecast() {
            
            var firstDay = data["list"][5]["dt_txt"] + "<br>" + "<b>Temp: </b>" + data["list"][5]["main"]["temp"] + "&#176F. " + "<br>" + "<b>Wind: </b>" + data["list"][5]["wind"]["speed"] + " MPH" + "<br>" + "<b>Humidity: </b>" + data["list"][5]["main"]["humidity"] + "%";
            dayOne1.innerHTML = firstDay

            var secondDay = data["list"][13]["dt_txt"] + "<br>" + "<b>Temp: </b>" + data["list"][13]["main"]["temp"] + "&#176F. " + "<br>" + "<b>Wind: </b>" + data["list"][13]["wind"]["speed"] + " MPH" + "<br>" + "<b>Humidity: </b>" + data["list"][13]["main"]["humidity"] + "%";
            dayTwo2.innerHTML = secondDay;

            var thirdDay = data["list"][21]["dt_txt"] + "<br>" + "<b>Temp: </b>" + data["list"][21]["main"]["temp"] + "&#176F. " + "<br>" + "<b>Wind: </b>" + data["list"][21]["wind"]["speed"] + " MPH" + "<br>" + "<b>Humidity: </b>" + data["list"][21]["main"]["humidity"] + "%";
            dayThree3.innerHTML = thirdDay;

            var fourthDay = data["list"][29]["dt_txt"] + "<br>" + "<b>Temp: </b>" + data["list"][29]["main"]["temp"] + "&#176F. " + "<br>" + "<b>Wind: </b>" + data["list"][29]["wind"]["speed"] + " MPH" + "<br>" + "<b>Humidity: </b>" + data["list"][29]["main"]["humidity"] + "%";
            dayFour4.innerHTML = fourthDay;

            var fifthDay = data["list"][37]["dt_txt"] + "<br>" + "<b>Temp: </b>" + data["list"][37]["main"]["temp"] + "&#176F. " + "<br>" + "<b>Wind: </b>" + data["list"][37]["wind"]["speed"] + " MPH" + "<br>" + "<b>Humidity: </b>" + data["list"][37]["main"]["humidity"] + "%";
            dayFive5.innerHTML = fifthDay;

        }
    }

    function renderItems(city, data) {
        renderCurrentWeather(city, data);
        renderForecast(data);
    }

    //fetch
        // openweatherAPI
            //fetch coordinates
    function fetchWeather (location) {
        var { lat } = location;
        var { lon } = location;
        var city = location.name;
        var apiUrl = `${weatherApiRootUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`;

        fetch(apiUrl)
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                renderItems(city, data);
            })
            .catch(function (err) {
                console.error(err);
            });
    }


    function fetchCoords (search) {
        var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${searchInput}&limit=5&appid=${weatherApiKey}`;

        fetch(apiUrl)
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                if (!data[0]) {
                    alert('Please enter a valid city')
                } else {
                    appendToHistory(searchInput);
                    fetchWeather(data[0]);
                }
            })
            .catch(function (err) {
                console.error(err);
            })

            }

        }

    //Click Handlers
    // $("#search-button").on("click",displayWeather);
    renderItems(city, data);
    initSearchHistory();
