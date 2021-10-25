// Variables
var ticketMasterCont = document.querySelector("ticketCont");
var weatherCont = document.querySelector("weatherCont")



var rootURL = "https://api.openweathermap.org/"
var apiKey = "966a86c8bd69d14a621d45a4cd70fed2"






function getWeatherAPI(city){


    

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