let city_input = document.querySelector('.city')

let error = document.querySelector('.error')

let enter_city = document.querySelector('.btn')

let degree = document.querySelector('.degree')

let loc = document.querySelector('.location')

let humidity = document.querySelector('.humidity')

let wind = document.querySelector('.wind');


async function weather_checker(city_name) {

    error.innerText = ''

    let get_res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city_name}&count=1&format=json`)

    let get_data = await get_res.json()

    if (!get_data.results || get_data.results.length === 0) {
        console.log("City not found");
        return;
    }

    let lat = get_data.results[0].latitude

    let lon = get_data.results[0].longitude

    let weather_res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`)

    let weather_data = await weather_res.json()

    loc.innerText = city_name;

    degree.innerText = weather_data.current.temperature_2m + '°C';

    humidity.innerText = weather_data.current.relative_humidity_2m + '%';

    wind.innerText = weather_data.current.wind_speed_10m + 'Km/h';
}

weather_checker('Islamabad');

enter_city.addEventListener('click', async function() {
    error.innerText = ''

    if(city_input.value === '')
    {
        error.innerText = 'Please Enter Location First'
        return;
    }

    weather_checker(city_input.value.trim())

})