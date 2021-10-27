// Variables
var title = document.querySelector("#titleHeader")
var ticketMasterCont = document.querySelector(".ticketCont")
var weatherCont = document.querySelector(".weatherCont")
var dateTitle = document.querySelector(".showDate")
// var weatherBlock = document.querySelector(".weatherBlock")


var wAPIKey = "&appid=966a86c8bd69d14a621d45a4cd70fed2"

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},
// {country code}&limit={limit}&appid={API key}
var wGeoRootURL = "https://api.openweathermap.org/geo/1.0/direct?q="
var paramGeo =",US&limit=5"

//api.openweathermap.org/data/2.5/forecast?lat={city lat}&lon={city lon}&appid={API key}
var wRootURL = "https://api.openweathermap.org/data/2.5/forecast?lat="
var lon = "&lon="
var paramWeath = "&units=imperial"


//https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0
//&radius=30&unit=miles&source=ticketmaster&locale=*&endDateTime=2021-10-29T19:35:00Z&size=5&city=los%20angeles&stateCode=CA&preferredCountry=us
var tRootURL = "https://app.ticketmaster.com/discovery/v2/events?"
var tAPIKey ="&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0"


function getWeatherAPI(city){
    // weatherCont.innerHTML = ""
    //ticketMasterCont.innerHTML = ""
    


    // testing data and grabbing latitude and longitude
    var wURL = wGeoRootURL +  city + paramGeo + wAPIKey

    fetch(wURL)
        .then(function(response){
        return response.json()
        })
    
        .then(function(data){
            var geodata = data[0]
        
            var w5dayURL = wRootURL + geodata.lat + lon + geodata.lon + paramWeath + wAPIKey

            fetch(w5dayURL)
                .then(function(response){
                    return response.json()
                })
                .then(function(wData){
                    var cityData = wData
                    // console.log(cityData)
                
                    var cityTitle = document.createElement("h1")
                    cityTitle.textContent = city.toUpperCase() + " " + moment.unix(wData.city.sunrise).format("DD/MM/YYYY")
                    title.prepend(cityTitle)

                    // I think this needs to be in a loop
                    for(var i = 0; i < wData.list.length; i=i+8){
                        var thisDate = wData.list[i]
                        // Set up the daily weather containers in enirety
                    
                        var wCardCol = document.createElement("div")
                        wCardCol.className = "card"
                        wCardCol.setAttribute("style", "width: 300px;")
                        
                        var todayDate = document.createElement("div")
                        todayDate.className = "card-divider align-center"
                        todayDate.textContent = moment.unix(thisDate.dt).format("DD-MM-YYYY")
                        wCardCol.append(todayDate)
                        // moment.unix(thisDate.dt).format("DD-MM-YYYY")
                        
                        var wBlock = document.createElement("div")
                        wBlock.className = "card-section weatherBlock"
                        // Should I add the icon for the daily weather?

                        var wList = document.createElement("div")
                        wList.className = "card-section weatherBlock"
                    
                        var ulItem = document.createElement("ul")
                    

                        var dayDesc = document.createElement("li")
                        dayDesc.textContent = thisDate.weather[0].description
                        ulItem.append(dayDesc)

                        var dayTemp = document.createElement("li")
                        dayTemp.textContent = "Temp: \n" + thisDate.main.temp + "\u00B0F"
                        ulItem.append(dayTemp)

                        var dayWind = document.createElement("li")
                        dayWind.textContent = "Wind: \n" + thisDate.wind.speed + "MPH"
                        ulItem.append(dayWind)
                    
                        var dayHumid = document.createElement("li")
                        dayHumid.textContent = "Humidity: \n" + thisDate.main.humidity + "%"
                        ulItem.append(dayHumid)
                    
                    
                        wList.append(ulItem)
                        wBlock.append(wList)
                        wCardCol.append(wBlock)
                        weatherCont.append(wCardCol)

                        console.log(thisDate)
                        console.log(i)
                    
                    }
                })

        })

}


function getLocalValue(){
    //get access to storage and save city location to a variable
    let myStorage = window.localStorage
    let cityName = myStorage.cityName

    getWeatherAPI(cityName)
}


getLocalValue();