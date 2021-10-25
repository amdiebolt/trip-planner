var inputEl = document.querySelector('input[name="searchCity"]')







function getRepo(event){

    event.preventDefault()

    var city = inputEl.value.trim()
    
    console.log(typeof (city))

    if(!city){
        return
    }

    localStorage.setItem("cityName", city)

    location.assign('./landing.html')

}

document.getElementById("submit").addEventListener("click", getRepo)