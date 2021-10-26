// Variables
var ticketMasterCont = document.querySelector("#ticketCont");
var weatherCont = document.querySelector("#weatherCont")



var weatherURL = "https://api.openweathermap.org/"
var weatherAPIKey = "966a86c8bd69d14a621d45a4cd70fed2"
var ticketmasterURL = "https://app.ticketmaster.com/discovery/v2/events?"
var ticketmasterAPIKey ="apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0"






function getWeatherAPI(city){



    fetch()
        .then(function(response){
        return response.json()
        })
    
        .then(function(data){
        
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