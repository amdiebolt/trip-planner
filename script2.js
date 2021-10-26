// Variables
var ticketMasterCont = document.querySelector("#ticketCont");
var weatherCont = document.querySelector("#weatherCont")


var wAPIKey = "&appid=966a86c8bd69d14a621d45a4cd70fed2"

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},
// {country code}&limit={limit}&appid={API key}
var wGeoRootURL = "https://api.openweathermap.org/geo/1.0/direct?q="
var wGeoXtnd =",US&limit=5"

//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
var wRootURL = "https://api.openweathermap.org/data/2.5/forecast?q="


//https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0
//&radius=30&unit=miles&source=ticketmaster&locale=*&endDateTime=2021-10-29T19:35:00Z&size=5&city=los%20angeles&stateCode=CA&preferredCountry=us
var tRootURL = "https://app.ticketmaster.com/discovery/v2/events?"
var tAPIKey ="&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0"





function getWeatherAPI(city){
    weatherCont.innerHTML = ""
    ticketMasterCont.innerHTML = ""


    // testing data and grabbing latitude and longitude
    var wURL = wGeoRootURL + city + wGeoXtnd + wAPIKey

    fetch(wURL)
        .then(function(response){
        return response.json()
        })
    
        .then(function(data){
            var geodata = data[0]
            console.log(geodata)
        
            var w5dayURL = wRootURL + city + wAPIKey
            console.log(w5dayURL)
            fetch(w5dayURL)
                .then(function(response){
                    return response.json()
                })
                .then(function(wData){
                    var xdata = wData
                    console.log(xdata)
                
                    var cityTitle = document.createElement("h2")
                    cityTitle.textContent = city.toUpperCase() + " "  + moment.unix(wData.city.sunrise).format("YYYY/MM/DD")
                
                    weatherCont.append(cityTitle)

                })

        })

}


function getLocalValue(){
    //get access to storage and save city location to a variable
    let myStorage = window.localStorage
    console.log(myStorage)
    let cityName = myStorage.cityName
    console.log(cityName)

    getWeatherAPI(cityName)
}


getLocalValue();