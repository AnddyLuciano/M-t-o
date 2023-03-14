const apiKey='api key here';
let apiResult;

const temps = document.querySelector(".temps");
const temperature = document.querySelector(".temperature");
const localisation = document.querySelector(".localisation");
const hours = document.querySelectorAll(".hh");
const degHours = document.querySelectorAll(".degh");
const logo = document.querySelector(".logo");

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position)=>{
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        CallAPI(long, lat);
    },()=>{
            alert('Vous avez refusé l\'autorisation d\'accès à votre positionnement.');
        });
}

function CallAPI(long, lat){
    Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${apiKey}`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${apiKey}`)
    ]) 
    .then((allResponse)=>{
        return Promise.all(allResponse.map(function(response){return response.json();}));
    })
    .then((data)=>{
        console.log(data);
        apiResult = data;
        temps.innerText = apiResult[0].weather[1].description;
        temperature.innerText = `${Math.round(apiResult[0].main.temp)}°`;
        localisation.innerText = apiResult[0].name;


        let actHour = new Date().getHours();
        for(let i = 0; i < hours.length; i++){
            let incrHours = actHour + i * 3;
            if(incrHours>=24){
                hours[i].innerText = `${incrHours - 24} h`;
            }
            else
                hours[i].innerText = `${incrHours} h`;
        }
        for (let i = 0; i < degHours.length; i++) {
            degHours[i].innerText = `${Math.round(apiResult[1].list[i].main.temp)}°`;
        }
    });
}
