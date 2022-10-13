var searchHistory = [];

//OpenWeather API root and key
var weatherApiRootUrl = 'https://api.openweathermap.org';
var weatherApiKey = 'cf30aa7d4098c837bc982a675f853adc';

var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var searchHistoryContainer = document.querySelector('#history');

//Current Forecast Variables
var todayContainer = document.querySelector('#today');
var currentWeather = document.getElementById('current-weather');
var forecastContainer = document.querySelector('forecast');
var searchButton = document.querySelector('#search-button');
var city = document.querySelector('#city');

//5-Day Forecast Variables
// var dayOne1 = document.querySelector(".dayOne")
// var dayTwo2 = document.querySelector(".dayTwo")
// var dayThree3 = document.querySelector(".dayThree")
// var dayFour4 = document.querySelector(".dayFour")
// var dayFive5 = document.querySelector(".dayFive")
// var todayDate = document.querySelector(".currentDay")
// var city = document.querySelector(".name");
// var weather = document.querySelector(".currentWeather");



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
            btn.textContent = searchHistory[i]
            searchHistoryContainer.append(btn);
    }

    //append and render search history
    function appendToHistory(search) {
        searchHistory.push(search);
        localStorage.setItem('search-history', JSON.stringify(searchHistory));
        renderSearchHistory();
    
    }

    //init search
    // function initSearchHistory() {
    initSearchHistory = function() {
        var storedHistory = localStorage.getItem('search-history');
        if (storedHistory) {
            searchHistory = JSON.parse(storedHistory);
        }
        renderSearchHistory();
    }};
   
    //if city hasn't been searched for already, search start a new search with new coordinates
    function handleSubmit() {
        if (!city.value) {
            return
        }
        var search = city.value
        fetchCoords(search)
        city.value = ""
    }

    //redundant, saving just in case I missed something
    // searchButton.addEventListener("click", function () {
    //         // var renderSearchHistory = function() {
    //         // searchHistoryContainer.innerHTML = '';

    //             var btn = document.createElement('button');
    //             btn.setAttribute('type', 'button');
    //             btn.setAttribute('aria-controls', 'today forecast');
    //             btn.classList.add('history-btn', 'btn-history');

    //             btn.setAttribute('data-search', searchHistory[i]);
    //             btn.textContent = searchHistory[i];
    //             searchHistoryContainer.append(btn);
    //         }
    //     )
          
  

//forecast

    //render current forecast
        // searchButton.addEventListener("click", function () {
        // // function renderCurrentWeather(city, weather) {
        //     var searchInput = searchInput;
        //     var apiUrl = `${weatherApiRootUrl}/data/2.5/weather?q=${searchInput}&appid=${weatherApiKey}`;
            
        //     fetch(apiUrl)
        //         .then(response => response.json())
        //         .then(data => {
        //             console.log(data);
    function renderCurrentWeather(city, weather) {

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
        //adding icons from open weather
        var iconUrl = `https://openweathermap.org/img/w/${weather.current.weather[0].icon}.png`;
        var iconAlt = weather.current.weather[0].description;
        var weatherIcon = document.createElement('img');

        weatherIcon.setAttribute('src', iconUrl);
        weatherIcon.setAttribute('alt', iconAlt);
        tempEl.textContent = `${Math.round(tempF)} F`;
        windEl.textContent = `${Math.round(windMph)} MPH`;
        humidityEl.textContent = `${humidity} %`;
        uviEl.textContent = "uvindex: ";
        uviBadge.textContent = uvi;
        uviEl.append(uviBadge);
        cardBody.append(heading, tempEl, windEl, humidityEl);
        cardBody.append(uviEl);
        card.append(cardBody);
        heading.textContent = `${city} ${date}`;
        heading.append(weatherIcon);
        currentWeather.innerHTML = '';
        currentWeather.append(card);
    }

    //this doesn't work, keeping it just in case
    // //5-day forecast 
    // searchButton.addEventListener("click", function() {
    //     var searchInput = searchInput;
    //     var apiUrl = `${weatherApiRootUrl}/data/2.5/weather?q=${searchInput}&appid=${weatherApiKey}`;
        
    //     fetch(apiUrl)
    //     .then(function (res) {
    //         return res.json();
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data)

    //     .then(function (data) {
    //         renderItems();
    //     })
    //     .then (function renderForecast() {
            
    //         var firstDay = data["list"][5]["dt_txt"] + "<br>" + "<b>Temp: </b>" + data["list"][5]["main"]["temp"] + "&#176F. " + "<br>" + "<b>Wind: </b>" + data["list"][5]["wind"]["speed"] + " MPH" + "<br>" + "<b>Humidity: </b>" + data["list"][5]["main"]["humidity"] + "%";
    //         dayOne1.innerHTML = firstDay

    //         var secondDay = data["list"][13]["dt_txt"] + "<br>" + "<b>Temp: </b>" + data["list"][13]["main"]["temp"] + "&#176F. " + "<br>" + "<b>Wind: </b>" + data["list"][13]["wind"]["speed"] + " MPH" + "<br>" + "<b>Humidity: </b>" + data["list"][13]["main"]["humidity"] + "%";
    //         dayTwo2.innerHTML = secondDay;

    //         var thirdDay = data["list"][21]["dt_txt"] + "<br>" + "<b>Temp: </b>" + data["list"][21]["main"]["temp"] + "&#176F. " + "<br>" + "<b>Wind: </b>" + data["list"][21]["wind"]["speed"] + " MPH" + "<br>" + "<b>Humidity: </b>" + data["list"][21]["main"]["humidity"] + "%";
    //         dayThree3.innerHTML = thirdDay;

    //         var fourthDay = data["list"][29]["dt_txt"] + "<br>" + "<b>Temp: </b>" + data["list"][29]["main"]["temp"] + "&#176F. " + "<br>" + "<b>Wind: </b>" + data["list"][29]["wind"]["speed"] + " MPH" + "<br>" + "<b>Humidity: </b>" + data["list"][29]["main"]["humidity"] + "%";
    //         dayFour4.innerHTML = fourthDay;

    //         var fifthDay = data["list"][37]["dt_txt"] + "<br>" + "<b>Temp: </b>" + data["list"][37]["main"]["temp"] + "&#176F. " + "<br>" + "<b>Wind: </b>" + data["list"][37]["wind"]["speed"] + " MPH" + "<br>" + "<b>Humidity: </b>" + data["list"][37]["main"]["humidity"] + "%";
    //         dayFive5.innerHTML = fifthDay;
    //     })
    //     .catch(function (err) {
    //         console.error(err);
    //     });
    // })
    
    function renderItems() {
        renderCurrentWeather(city, data);
        renderForecast(data);
    }

    function renderForecast(forecast) {
        var headingCol = document.createElement('div');
        var heading = document.createElement('h4');
    }


    function renderForecastCard(forecast) {
        var unixTimeStamp = forecast.dt
        var iconURL = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
        var iconAlt = forecast.weather[0].description;
        var tempF = forecast.temp.day
        var humidity = forecast.humidity
        var windSpeed = forecast.wind_speed
    
        var col = document.createElement('div');
        var card = document.createElement('div');
        var cardBody = document.createElement('div');
        var cardTitle = document.createElement('h5');
        var weatherIcon = document.createElement('img');
        var tempEl = document.createElement('p');
        var windEl = document.createElement('p');
        var humidityEl = document.createElement('p');
    
        col.append(card);
        card.append(cardBody);
        cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);
        cardTitle.textContent = moment.unix(unixTimeStamp).format("MM/DD/YYYY");
        weatherIcon.setAttribute('src', iconUrl);
        weatherIcon.setAttribute('alt', iconAlt);
        tempEl.textContent = `${Math.round(tempF)} F`;
        windEl.textContent = `${Math.round(windSpeed)} MPH`;
        humidityEl.textContent = `${humidity} %`;
        forecastContainer.append(col);
    }



    //fetch
        // openweatherAPI
            //fetch coordinates
    function fetchWeather (location) {
        var { lat } = location;
        var { lon } = location;
        var city = location.name;
        var apiUrl = `${weatherApiRootUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`

        fetch(apiUrl)
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                renderItems();
            })
            .catch(function (err) {
                console.error(err);
            });
    }
    
    function fetchCoords (search) {
        var searchInput = searchInput;
        var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${searchInput}&limit=5&appid=${weatherApiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            }).then(function (data) {
                if (!data[0]) {
                    alert('Please enter a valid city')
                } else {
                    appendToHistory(searchInput);
                    fetchWeather(data[0]);
                }
            })
            .catch(function (err) {
                console.error(err);
            });

    }

// added back in
initSearchHistory();
searchButton.addEventListener("click", handleSubmit);

