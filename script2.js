// Variables
var ticketMasterCont = document.querySelector("#ticketCont");
var weatherCont = document.querySelector("#weatherCont")


//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
var wRootURL = "https://api.openweathermap.org/data/2.5/forecast?q="
var wAPIKey = "&appid=966a86c8bd69d14a621d45a4cd70fed2"
var tRootURL = "https://app.ticketmaster.com/discovery/v2/events?"
var tAPIKey ="apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0"




function getWeatherAPI(city){
    wURL = wRootURL + city + wAPIKey
    console.log(wURL)

    fetch(wURL)
        .then(function(response){
        return response.json()
        })
    
        .then(function(data){
            var wdata = data[0]
            console.log(wdata)
        
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