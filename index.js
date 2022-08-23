//variables

var searchHistory = [];

//OpenWeather API root and key
var weatherApiRootUrl = 'https://api.openweathermap.org';
var weatherApiKey ='cf30aa7d4098c837bc982a675f853adc'; 

//variables used to search for cities 
var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var searchHistoryContainer = document.querySelector('#history');

//current forecast
var todayContainer = document.querySelector('#today');
//five-day forecast
var forecaseContainer = document.querySelector('#forecast');
var searchButton = document.querySelector('#search-button');


//variables for the day p tags for the 5-day forecast
var dayOne1 = document.querySelector(".dayOne")
var dayTwo2 = document.querySelector(".dayTwo")
var dayThree3 = document.querySelector(".dayThree")
var dayFour4 = document.querySelector(".dayFour")
var dayFive5 = document.querySelector(".dayFive")
var currentDay = document.querySelector(".currentDay")


//search, populate the current day

searchButton.addEventListener("click", function () {
    fetch(`${weatherApiRootUrl}/data/2.5/weather?q-?+${searchInput.value}+&appid=${weatherApiKey}+&units=imperial`)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            //data and formatting for the data from OpenWeather
            var dayName = data["name"];
            var currentDate = moment().format("dddd, MMMM");
            var temp = "Temperature: " + data['main']['temp'] + " &#176F";
            var windSpeed = "Wind: "  + data.wind.speed + " MPH"
            var humidity = "Humidity: " + data['main']['humidity'] + "%";
            var uvIndex = ["UV Index: "];

            //take those variables, add them to elements
            nameEl.innerHTML = nameValue;
            tempEl.innerHTML = tempValue;
            windEl.innerHTML = windValue;
            humidityEL.innerHTML = humidityValue;
            uvEL.innerHTML = uvValue;
            todayDate.innerHTML = currentDate;
        })
})

//copied and pasted from current day **SO IF SOMETHING IS BROKEN HERE IT'S BROKEN THERE MOST LIKELY
searchButton.addEventListener("click", function () {
    fetch(`${weatherApiRootUrl}/data/2.5/weather?q-?+${searchInput.value}+&appid=${weatherApiKey}+&units=imperial`)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            //data and formatting for the data from OpenWeather
            var dayName = data["name"];
            var currentDate = moment().format("dddd, MMMM");
            var temp = "Temperature: " + data['main']['temp'] + " &#176F";
            var windSpeed = "Wind: "  + data.wind.speed + " MPH"
            var humidity = "Humidity: " + data['main']['humidity'] + "%";
            // var uvIndex = ["UV Index: "];

            //need to add all those variables to the elements for each day
            //had monday tuesday, etc. but that doesn't work for looking at the forecast on different days
            //changed the names of the variables for they aren't referring back to themselves

            var dayOne = data["list"][5]["dt_txt"] + "Temp: " + data["list"][5]["main"]["temp"] + "&#176F " + "Wind: " + data["list"][5]["wind"]["speed"] + "MPH" + "Humidity: " + data["list"][5]["main"]["humidity"] + "%";
            dayOne1.innerHTML = dayOne

            var dayTwo = data["list"][5]["dt_txt"] + "Temp: " + data["list"][5]["main"]["temp"] + "&#176F " + "Wind: " + data["list"][5]["wind"]["speed"] + "MPH" + "Humidity: " + data["list"][5]["main"]["humidity"] + "%";
            dayTwo2.innerHTML = dayTwo

            var dayThree = data["list"][5]["dt_txt"] + "Temp: " + data["list"][5]["main"]["temp"] + "&#176F " + "Wind: " + data["list"][5]["wind"]["speed"] + "MPH" + "Humidity: " + data["list"][5]["main"]["humidity"] + "%";
            dayThree3.innerHTML = dayThree

            var dayFour = data["list"][5]["dt_txt"] + "Temp: " + data["list"][5]["main"]["temp"] + "&#176F " + "Wind: " + data["list"][5]["wind"]["speed"] + "MPH" + "Humidity: " + data["list"][5]["main"]["humidity"] + "%";
            dayFour4.innerHTML = dayFour

            var dayFive = data["list"][5]["dt_txt"] + "Temp: " + data["list"][5]["main"]["temp"] + "&#176F " + "Wind: " + data["list"][5]["wind"]["speed"] + "MPH" + "Humidity: " + data["list"][5]["main"]["humidity"] + "%";
            dayFive5.innerHTML = dayFive
            
            // nameEl.innerHTML = nameValue;
            // tempEl.innerHTML = tempValue;
            // windEl.innerHTML = windValue;
            // humidityEL.innerHTML = humidityValue;
            // uvEL.innerHTML = uvValue;
            // todayDate.innerHTML = currentDate;
        })
})

//is currently adding [object Object] instead of the searched for city
// searchButton.addEventListener("click", appendToHistory);

    //render - like a git 
        function renderSearchHistory() {
            //set to empty to avoid just adding to the prints 
            searchHistoryContainer.innerHTML = '';
            //building something out in decending order, decrement
            for (let i = searchHistory.length - 1; i >= 0; i--) {
                var btn = document.createElement('button');
                //add normalize classes here
                btn.setAttribute('type', 'button');
                btn.setAttribute('aria-controls', 'today forecast')
                btn.classList.add('history-btn', 'btn-history');
                
                btn.setAttribute('data-search', searchHistory[i]);
                btn.textContent = searchHistory[i];
                searchHistoryContainer.append(btn);

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
    //render current
        //openweatherapi, cards **NEED TO GET THE WEATHER TO POST TO THE CARDS
function renderCurrentWeather(city, weather, timezone){

    //variables
    var cityName = data["name"];
    var tempF = weather.temp;
    var windMph = weather.wind_speed;
    var humidity = weather.humidity;
    var uvi = weather.uvi;

    //elements the variables correspond to - ex. uvi is what will go into uviEl
    var card = document.createElement('div');
    var cardBody = document.createElement('div');
    var heading = document.createElement('h2');
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p');
    var uviEl = document.createElement('p');
    var uviBadge = document.createElement('button');

};

// var todaysForecast = 
function renderForecast() {
  //will be very similar, but no uvi index for one - should be fine to use the same variables as the scope of var should stay within the function
  //should render each day?
  
  //variables
    var tempF = weather.temp;
    var windMph = weather.wind_speed;
    var humidity = weather.humidity;
  //elements that correspond to the variables
    var card = document.createElement('div');
    var cardBody = document.createElement('div');
    var heading = document.createElement('h2');
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p');
};

// var fiveDayForecast = 
    function renderItems (city, data) {
    renderCurrentWeather(city, data);
    renderForecast(data);
};
    //fetch
        //openweatherAPI - will need my api key from my account
                //fetch coordinates
    function fetchWeather(location) {
        var { lat } = location;
        var { lon } = location;
        var city = location.name;
        var apiUrl = `${weatherApiRootUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`;
   
        fetch(apiUrl)
            .then(function(res){
                return res.json();
            }) 
            .then(function(data) {
                renderItems(city, data)
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    
    function fetchCoordinates (search) {
        var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;

        fetch(apiUrl)
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                if (!data[0]) {
                    alert('Location Not Found')
                }else {
                    appendToHistory(search);
                    fetchWeather(data[0]);
                }

            })
            .catch(function(err) {
                console.log(err);
            })
    }
    

    
    initSearchHistory();

    // searchButton.onClick() = appendToHistory; - wasn't working
