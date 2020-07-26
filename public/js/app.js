console.log('Client side javascript file is loaded!')



const weatherForm = document.querySelector('form');
// takes value from search
const search = document.querySelector('input');

// find the p with the id of #message-1
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {

        response.json().then((data) => {

            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            }
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })

})

