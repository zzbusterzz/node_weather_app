var url = '/weather?address='

const weatherform = document.querySelector('form');
const input = document.querySelector('input');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');
const msg3 = document.querySelector('#msg3');
const img = document.querySelector('#img1');

weatherform.addEventListener('submit', (event) => {
    const address = input.value;
    event.preventDefault(); 
 
    console.log(address);
    msg1.textContent = "Loading...";
    msg2.textContent = "";
    msg3.textContent = "";
    img.src = "";
    if(address != null || address != ""){
        fetch(url + address).then((response) => {
        response.json().then((data)=> {
                if(data.error)
                {
                    msg1.textContent = data.error;
                }
                else
                {
                    const {address, place_name, forecast,  weather_icons, wind_data, uv_index } = data;

                    msg1.textContent = `Location: ${place_name}`;
                    msg2.textContent = `Forecast: ${forecast}`;
                    msg3.textContent = `Wind: ${wind_data}`;
                    img.src = weather_icons;

                }
            })
        })
    }else{
        msg1.textContent = "Error: " + data.error;
    }
})