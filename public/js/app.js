console.log('Client side js file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('http://localhost:3000/weather?address=' + location).then((res) => {
        res.json().then((forecast) => {
            if(forecast.error) {
                messageOne.textContent = forecast.error;
            } else{
                messageOne.textContent = forecast.location
                messageTwo.textContent = forecast.forecastData;
            }
        });
    });
});