//will need to attach api calls




//set up array for search history - just tell JS that it's an array by using an empty array
var searchHistory = [];
//api setup
var weatherApiRootUrl = 'https://api.openweathermap.org';
var weatherApiKey ='cf30aa7d4098c837bc982a675f853adc'; 

//declare specific id's associated with index, try listing first then defining
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
            // for (let i = 0; i < 10; i++) {}
        }
    //append what we're searching to our history
        function appendToHistory(search) {
            searchHistory.push(search);
        //very simple memory within the browser - set searched item to local storage
        //set something or get something CRUD
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
        //LARGEST PART OF THE PROJECT - openweatherapi, cards
function renderCurrentWeather(city, weather, timezone){
    //how the api is set up

    //variable
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

function renderForecast() {
  //will be very similar, but no uvi index for one
};

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
        //var { lat,long } = location;
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
                //in the global scope of the JS file, this is the only thing that runs (this goes first)
initSearchHistory();