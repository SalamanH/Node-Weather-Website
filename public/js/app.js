const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const cityName = document.getElementById('cityName');
const country = document.getElementById('country');
const timeIMG = document.getElementById('time');
const temp = document.getElementById('temp');
const descr = document.getElementById('descr');
const precip = document.getElementById('precip');
const icon = document.getElementById('icon');
const feelslike = document.getElementById('feelslike');
const humidity = document.getElementById('humidity');
const weatherCard = document.getElementById('card');
const loader = document.getElementById('loader');


weatherForm.addEventListener('submit', (event) => {
    loader.classList.add('d-flex');
    event.preventDefault();
    const location = search.value;
    if (weatherCard.classList.contains('d-none')) {}
    else {weatherCard.classList.add('d-none')}


    fetch(`/weather?address=${location}`).then((Response) => {
        Response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                messageOne.textContent = data.error;
            } else {
                
                
                setTimeout(()=>{
                    cityName.textContent = data.name;
                    country.textContent = data.country;
                    timeIMG.setAttribute('src', data.is_day === 'yes'? 'img/day_image.svg' : 'img/night_image.svg')
                    temp.textContent = data.temp + "°C";
                    descr.textContent = data.descr;
                    precip.textContent = 'Precip: ' + data.precip;
                    icon.setAttribute('src' , `${data.weather_icon}`);
                    feelslike.textContent = data.feelslike+ "°C";
                    humidity.textContent = data.humidity + '%';
                    messageOne.textContent = '';
                    loader.classList.remove('d-flex');
                    if (weatherCard.classList.contains('d-none')) {weatherCard.classList.remove('d-none')}
                },1000)
                




            }

        })
    })
})