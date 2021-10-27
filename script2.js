// Variables
var title = document.querySelector("#titleHeader")
var ticketMasterCont = document.querySelector(".ticketCont")
var weatherCont = document.querySelector(".weatherCont")
var dateTitle = document.querySelector(".showDate")


var wAPIKey = "&appid=966a86c8bd69d14a621d45a4cd70fed2"

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},
// {country code}&limit={limit}&appid={API key}
var wGeoRootURL = "https://api.openweathermap.org/geo/1.0/direct?q="
var paramGeo =",US&limit=5"

//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
var wRootURL = "https://api.openweathermap.org/data/2.5/forecast?q="
var paramWeath = "&units=imperial"


//https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0
//&radius=30&unit=miles&source=ticketmaster&locale=*&endDateTime=2021-10-29T19:35:00Z&size=5&city=los%20angeles&stateCode=CA&preferredCountry=us
var tRootURL = "https://app.ticketmaster.com/discovery/v2/events?"
var tAPIKey ="&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0"


function getWeatherAPI(city){
    //weatherCont.innerHTML = ""
    //ticketMasterCont.innerHTML = ""
    


    // testing data and grabbing latitude and longitude
    var wURL = wGeoRootURL + city + paramGeo + wAPIKey

    fetch(wURL)
        .then(function(response){
        return response.json()
        })
    
        .then(function(data){
            var geodata = data[0]
            console.log(geodata)
        
            var w5dayURL = wRootURL + city + paramWeath + wAPIKey
            console.log(w5dayURL)
            fetch(w5dayURL)
                .then(function(response){
                    return response.json()
                })
                .then(function(wData){
                    var cityData = wData
                    console.log(cityData)
                
                    var cityTitle = document.createElement("h1")
                    cityTitle.textContent = city.toUpperCase() + " " + moment.unix(wData.city.sunrise).format("DD/MM/YYYY")
                    title.prepend(cityTitle)
                
                    // Set up the daily weather containers in enirety
                    var 

                    // I think this needs to be in a loop
                    for(var i = 0; i < wData.list.length; i++){
                        var thisDate = wData.list[i]
                        console.log(thisDate)
                        console.log(i)
                        console.log("this should be the date " + moment.unix(thisDate.dt).format("DD-MM-YYYY"))
                        console.log("This shoud be the temperature " + thisDate.main.temp)
                        console.log("This should be wind " + thisDate.wind.speed)
                        console.log("This should be humidity " + thisDate.main.humidity)
                        console.log("This should be description of weather " + thisDate.weather[0].description )
                        
                    
                    }
                    // var today = cityData.
                    // var wTitle = document.createElement("h2")
                    // var wTitle.textContent = moment.unix(cityData.sunrise)
                    // console.log("this should be the date " + moment.unix(cityData.list[0].dt).format("DD-MM-YYYY"))
                    // console.log("This shoud be the temperature " + cityData.list[0].main.temp)
                    // console.log("This should be wind " + cityData.list[0].wind.speed)
                    // console.log("This should be humidity " + cityData.list[0].main.humidity)
                    // console.log("This should be description of weather " + cityData.list[0].weather[0].description )
                    console.log()
                    console.log()
                    console.log()
                    console.log()
                    console.log()
                    console.log()
                    console.log()
                    console.log()
                    console.log()
                    console.log()

                })

        })

}


function getLocalValue(){
    //get access to storage and save city location to a variable
    let myStorage = window.localStorage
    let cityName = myStorage.cityName
    console.log(cityName)

    getWeatherAPI(cityName)
}


getLocalValue();