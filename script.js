var inputEl = document.querySelector('input[name="cityName"]')


function getRepo(event){

    event.preventDefault()

    var city = inputEl.value.trim()

    if(!city){
        return
    }

    localStorage.setItem("cityName", city)

    location.assign('./landing.html')

}

 document.getElementById("submit").addEventListener("click", getRepo)