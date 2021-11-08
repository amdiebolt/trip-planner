// Variables
const title = document.querySelector("#titleHeader")
const ticketMasterCont = document.querySelector(".ticketCont")
const weatherCont = document.querySelector(".weatherCont")
const dateTitle = document.querySelector(".showDate")
// key to be used in both openWeatherMap APIs
const apiKey = "&appid=966a86c8bd69d14a621d45a4cd70fed2"
// geolocation URL and parameters
const geolocationRootURL = "https://api.openweathermap.org/geo/1.0/direct?q="
const geoParameters =",US&limit=5"
//openWeatherMap URL and parameters
const wRootURL = "https://api.openweathermap.org/data/2.5/forecast?lat="
const lon = "&lon="
const paramWeath = "&units=imperial"
//Ticketmaster URL and API key
const tRootURL = "https://app.ticketmaster.com/discovery/v2/events?city="
const tAPIKey ="&apikey=iQ4Yd0IlGGkOhXpQxyQ3RyPmpAgRJSZs"
// set date and time for ticketmaster API
var endDateTime = new Date()
var numberOfDaysToAdd = 5
endDateTime.setDate(endDateTime.getDate() + numberOfDaysToAdd)
endDateTime = endDateTime.toISOString()
var string = endDateTime
var tempArray = string.split('')
tempArray.splice(19, 4)
endDateTime = tempArray.join('')

// begin program
getLocalValue()

// Retrieves input from previous page
function getLocalValue(){
    //get access to storage and save city location to a variable
    let myStorage = window.localStorage
    let cityName = myStorage.cityName

    geolocationAPI(cityName)
    getTickets(cityName)
}

// retrieving latitude and longitude for city location to be used in OpenWeatherMap API for Weather
function geolocationAPI(city){
    
    let geoAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${city},US&limit=5&appid=966a86c8bd69d14a621d45a4cd70fed2`

    //fetch URL for geolocation API
    fetch(geoAPI)
    .then(function(response){
        return response.json() 
    })
      
    .then(function(data){
        let cityLocation = data[0]   
        let weatherAPI = wRootURL + cityLocation.lat + lon + cityLocation.lon + paramWeath + apiKey   
        getWeatherAPI(weatherAPI, city)
    })
}

// fetches weather API to set up 5 day forecast
function getWeatherAPI(weatherAPI, city){

    fetch(weatherAPI)
    .then(function(response){
        return response.json()
    })

    .then(function(wData){
        let weatherData = wData
        // console.log(weatherData)

        // Create header element, set value to city + todays date, and add to top of page
        let pageTitle = document.createElement("h1")
        pageTitle.textContent = city.toUpperCase() + " " + moment.unix(weatherData.city.sunrise).format("YYYY/MM/DD")
        title.prepend(pageTitle)
    
        getAverageTemperature(weatherData, 0)
        getAverageTemperature(weatherData, 8)
        getAverageTemperature(weatherData, 16)
        getAverageTemperature(weatherData, 24)
        getAverageTemperature(weatherData, 32)       
    })

}

// API gives temperature for every three hours of the day, this function will get the average of those temperatures
function getAverageTemperature(weatherData, index){
// go through array

    let loopEnd = index + 7
    let i = index
    let avgTemp = 0

    while( i >= index && i <= loopEnd){
        let tempSnapshot = weatherData.list[i].main.temp
        avgTemp = avgTemp + tempSnapshot
    
        if(i === loopEnd){
            avgTemp /= 8
            avgTemp = Math.round(avgTemp * 100) / 100
            i ++
            createDailyForecast(avgTemp, weatherData, index)
        }
        i ++
    }
}

// Create the div elements to be filled in and posted to the site
function createDailyForecast(temperature, weatherData, index){
    
    let thisDate = weatherData.list[index]
    
    // Set up the daily weather containers in enirety
    let wCardCol = document.createElement("div")
    wCardCol.className = "card"
    wCardCol.setAttribute("style", "width: 300px;")
        
    // Create element div for the date, append to the weather column card
    let todayDate = document.createElement("div")
    todayDate.className = "card-divider align-center wdate"
    todayDate.textContent = moment.unix(thisDate.dt).format("YYYY-MM-DD")
    wCardCol.append(todayDate)
    
    let wBlock = document.createElement("div")
    wBlock.className = "card-section"
        
    // Create weather block element this will hold the ul list element
    let wList = document.createElement("div")
    wList.className = "card-section weatherBlock"
    
    let ulItem = document.createElement("ul")
    
    // Create the days overal description list element, assign value, append to Unordered list
    let dayDesc = document.createElement("li")
    dayDesc.textContent = thisDate.weather[0].description
    ulItem.append(dayDesc)

    // Create the days temperature list element, assign value, append to Unordered list
    let dayTemp = document.createElement("li")
    dayTemp.textContent = "Temp: \n" + temperature + "\u00B0F"
    ulItem.append(dayTemp)

    // Create the days wind list element, assign value, append to Unordered list
    let dayWind = document.createElement("li")
    dayWind.textContent = "Wind: \n" + thisDate.wind.speed + "MPH"
    ulItem.append(dayWind)
    
    // Create the days humidity list element, assign value, append to Unordered list
    let dayHumid = document.createElement("li")
    dayHumid.textContent = "Humidity: \n" + thisDate.main.humidity + "%"
    ulItem.append(dayHumid)
    
    // Append Ul list to -weather list -weather block -weather card column
    wList.append(ulItem)
    wBlock.append(wList)
    wCardCol.append(wBlock) 
    weatherCont.append(wCardCol)
}

function getTickets(city){
    
    var tURL = tRootURL + city + '&preferredCountry=us' + '&' + 'endDateTime=' + endDateTime + tAPIKey
    //console.log(endDateTime)

    fetch(tURL)
    .then(function(response){
        return response.json()
    })
    //
    .then(function(data){

        var  ticketData = data._embedded.events
        var targetBlank = 'target'
        var ticketBlock = document.querySelector('.ticketBlock')

        for(var i = 0; i < ticketData.length; i=i+4){
   
            var eventTitle = document.createElement("li")
            var anchor = document.createElement("a")
            anchor.setAttribute('href', ticketData[i].url)
            anchor.setAttribute('target', '_blank')
            anchor.innerText = ticketData[i].name
            eventTitle.append(anchor)
            ticketBlock.append(eventTitle)

            var eventDate = document.createElement("li")
            eventDate.textContent = ticketData[i].dates.start.localDate
            ticketBlock.append(eventDate)
            
            var eventLoc = document.createElement("li")
            eventLoc.textContent = ticketData[i]._embedded.venues[0].name
            ticketBlock.append(eventLoc)

            var eventPrice = document.createElement("li")
           
            
            if(ticketData[i].priceRanges){
                
                eventPrice.textContent = '$' + ticketData[i].priceRanges[0].min + '-' + ticketData[i].priceRanges[0].max
                ticketBlock.append(eventPrice)
                var breakEl = document.createElement("br")
                ticketBlock.append(breakEl)
            }else{
                eventPrice.textContent = "Price Not Listed"
                ticketBlock.append(eventPrice)
                var breakEl = document.createElement("br")
                ticketBlock.append(breakEl)
            }
        }
    })
}