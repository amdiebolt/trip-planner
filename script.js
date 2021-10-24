var buttonEl = document.querySelector('.button')


buttonEl.addEventListener('click', getRepo())
function getRepo(event){
    event.preventDefault()
    location.assign('\landing.html')
}

