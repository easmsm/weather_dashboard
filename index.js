var searchHistory = [];


var weatherApiRootUrl = 'https://api.openweathermap.org';
var weatherApiKey ='cf30aa7d4098c837bc982a675f853adc'; 

var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var searchHistoryContainer = document.querySelector('#history');

//current forecast
var todayContainer = document.querySelector('#today');
//five-day forecast
var forecaseContainer = document.querySelector('#forecast');
var searchButton = document.querySelector('#search-button');






//search
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
            //check it - () is what you want to check, looks for a truthy response "if stored history is present"
            if (storedHistory) {
                searchHistory = JSON.parse(storedHistory); //searchHistory is a global variable that we have access to anywhere
                
            }
            renderSearchHistory();
        }




        //forecast
    //render current
        //openweatherapi, cards **NEED TO GET THE WEATHER TO POST TO THE CARDS
function renderCurrentWeather(city, weather, timezone){

    //variables
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
    
    searchButton.addEventListener("click", appendToHistory);
    initSearchHistory();

    // searchButton.onClick() = appendToHistory;
