var inputEl = document.querySelector('input[name="cityName"]')







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
// var buttonEl = document.querySelector('#button')
// var inputEl = document.querySelector('#inputValue')
// var city 


// var formSubmitHandler = function (event) {
//      event.preventDefault()
  
//     city = inputEl.value.trim()
//      if (city) {
//       getRepo(city)
      

//     } else {
//       alert('Please enter a city')
//          }
//  }


//  function pageChange(event) {
//     event.preventDefault()
//     city = inputEl.value
  
//      if (!inputEl) {
//       console.error('You need to search for a city!');
//        return;
//      }
  
//     var queryString = './landing.html?q=' + city
  
//     location.assign(queryString)
    
//   }
//   buttonEl.addEventListener('click', pageChange)






 document.getElementById("button").addEventListener("click", getRepo)