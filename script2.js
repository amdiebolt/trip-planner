// Variables
var title = document.querySelector("#titleHeader")
var ticketMasterCont = document.querySelector(".ticketCont")
var weatherCont = document.querySelector(".weatherCont")
var dateTitle = document.querySelector(".showDate")

// key to be used in both openWeatherMap APIs
var wAPIKey = "&appid=966a86c8bd69d14a621d45a4cd70fed2"

// http://api.openweathermap.org/geo/1.0/direct?q={city name},
// {country code}&limit={limit}&appid={API key}
var wGeoRootURL = "https://api.openweathermap.org/geo/1.0/direct?q="
var paramGeo =",US&limit=5"

//api.openweathermap.org/data/2.5/forecast?lat={city lat}&lon={city lon}&appid={API key}
var wRootURL = "https://api.openweathermap.org/data/2.5/forecast?lat="
var lon = "&lon="
var paramWeath = "&units=imperial"

//https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0
//&radius=30&unit=miles&source=ticketmaster&locale=*&endDateTime=2021-10-29T19:35:00Z&size=5&city=los%20angeles&stateCode=CA&preferredCountry=us
var tRootURL = "https://app.ticketmaster.com/discovery/v2/events?city="
var tAPIKey ="&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0"


function getWeatherAPI(city){
    // testing data and grabbing latitude and longitude
    // var wURL = wGeoRootURL +  city + paramGeo + wAPIKey
    var wURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city},US&limit=5&appid=966a86c8bd69d14a621d45a4cd70fed2`

    //fetch URL for geolocation API
    fetch(wURL)
        .then(function(response){
        return response.json()
        })
    
        .then(function(data){
            var geodata = data[0]
            var w5dayURL = wRootURL + geodata.lat + lon + geodata.lon + paramWeath + wAPIKey

            //fetch URL for Weather API
            fetch(w5dayURL)
                .then(function(response){
                    return response.json()
                })
            
                .then(function(wData){
                    var cityData = wData
                    // console.log(cityData)
                
                    // Create header element, set value to city + todays date, and add to top of page
                    var cityTitle = document.createElement("h1")
                    cityTitle.textContent = city.toUpperCase() + " " + moment.unix(wData.city.sunrise).format("DD/MM/YYYY")
                    title.prepend(cityTitle)

                    // 
                    for(var i = 0; i < wData.list.length; i+=8){
                        var thisDate = wData.list[i]
                        // Set up the daily weather containers in enirety
                    
                        var wCardCol = document.createElement("div")
                        wCardCol.className = "card"
                        wCardCol.setAttribute("style", "width: 300px;")
                        
                        // 
                        var todayDate = document.createElement("div")
                        todayDate.className = "card-divider align-center"
                        todayDate.textContent = moment.unix(thisDate.dt).format("DD-MM-YYYY")
                        wCardCol.append(todayDate)
                        
                        // 
                        var wBlock = document.createElement("div")
                        wBlock.className = "card-section weatherBlock"
                        
                        // 
                        var wList = document.createElement("div")
                        wList.className = "card-section weatherBlock"
                    
                        var ulItem = document.createElement("ul")
                    
                        // 
                        var dayDesc = document.createElement("li")
                        dayDesc.textContent = thisDate.weather[0].description
                        ulItem.append(dayDesc)

                        // 
                        var dayTemp = document.createElement("li")
                        dayTemp.textContent = "Temp: \n" + thisDate.main.temp + "\u00B0F"
                        ulItem.append(dayTemp)

                        // 
                        var dayWind = document.createElement("li")
                        dayWind.textContent = "Wind: \n" + thisDate.wind.speed + "MPH"
                        ulItem.append(dayWind)
                    
                        // 
                        var dayHumid = document.createElement("li")
                        dayHumid.textContent = "Humidity: \n" + thisDate.main.humidity + "%"
                        ulItem.append(dayHumid)
                    
                        // 
                        wList.append(ulItem)
                        wBlock.append(wList)
                        wCardCol.append(wBlock) 
                        weatherCont.append(wCardCol)

                        // console.log(thisDate)
                        // console.log(i)

                    
                    
                    }
                })

        })

}

// enddatetime format: 
var proper = "2019-10-26T03:00:00Z"
//console.log(proper.length)


function getTickets(city){
   
    
    var tURL = tRootURL + city + '&preferredCountry=us' + '&' + 'endDateTime=' + endDateTime + tAPIKey
    //console.log(endDateTime)

    fetch(tURL)
    .then(function(response){
        return response.json()
    })
    // 
    .then(function(data){
       // var cityData = Data
        // console.log(cityData)
        var  ticketData = data._embedded.events
        //console.log(data)

    
        var ticketBlock = document.querySelector('.ticketBlock')
        for(var i = 0; i < ticketData.length; i=i+4){
   
            var eventTitle = document.createElement("li")
            //eventTitle.textContent = 
            var anchor = document.createElement("a")
            anchor.setAttribute('href', ticketData[i].url)
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
            eventPrice.textContent = '$' + ticketData[i].priceRanges[0].min + '-' + ticketData[i].priceRanges[0].max
            ticketBlock.append(eventPrice)
            var breakEl = document.createElement("br")
            ticketBlock.append(breakEl)

        }

    
})}

function getLocalValue(){
    //get access to storage and save city location to a variable
    let myStorage = window.localStorage
    let cityName = myStorage.cityName

    getWeatherAPI(cityName)
    getTickets(cityName)
}

var endDateTime = new Date();
var numberOfDaysToAdd = 5;
endDateTime.setDate(endDateTime.getDate() + numberOfDaysToAdd)
//console.log(endDateTime)
//console.log(endDateTime.toISOString())
endDateTime = endDateTime.toISOString()
//console.log(endDateTime.length)
var string = endDateTime
var tempArray = string.split('')
tempArray.splice(19, 4)
endDateTime = tempArray.join('')
//console.log(endDateTime)

getLocalValue();