var url = 'http://localhost:3000/weather?address='

const weatherform = document.querySelector('form');
const input = document.querySelector('input');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');

weatherform.addEventListener('submit', (event) => {
    const address = input.value;
    event.preventDefault(); 
 
    console.log(address);
    msg1.textContent = "Loading...";
    msg2.textContent = "";
    if(address != null || address != ""){
        fetch(url + address).then((response) => {
        response.json().then((data)=> {
                if(data.error)
                {
                    msg1.textContent = data.error;
                }
                    //console.log(data.error)
                else
                {
                    const {address, place_name, forecast} = data;
                    // console.log(address)
                    // console.log(place_name)
                    // console.log(forecast)
                    msg1.textContent = `Location: ${place_name}`;
                    msg2.textContent = `Forecast: ${forecast}`;
                }
            })
        })
    }else{
        msg1.textContent = "Error: " + data.error;
    }
})