const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode').geocode
const forecast = require('./utils/forecast').forecast
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express();

const port = process.env.PORT || 3000;

//Defines path for express config
const staticPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebar engine and view
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(staticPath))

app.get('/', (req, res) => {
    res.render('index', {
        title:'Home',
        location:'Earth',
        Author:"Mangirish"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About',
        charName:'Madara Uchiha',
        Author:"Mangirish"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        option1:'Option 1',
        option2:'Option 2',
        option3:'Option 3',
        Author:"Mangirish"
    })
})

app.get('/temp', (req, res) => {
    
    if(!req.query.search){
       return res.send({ error: 'Provide a search'});
    }

    console.log(req.query)
    res.send({product:[]})
})


app.get('/weather', (req, res) => {
    const {address} = req.query
    if(!address){
        return res.send({error: 'Address not provided'})
    }

    geocode(address, (error,{latitude, longitude, place_name} = {}) => {
        if(error)
            return res.send({error})
        else{
            console.log('Data', latitude, longitude)
            //const  = data;
            forecast(latitude, longitude, 'm' ,(error,  { temperature, feelslike, weather_descriptions, weather_icons, pressure, uv_index, humidity, precip, wind_speed, wind_dir} = {}) => {
                if(error)
                    res.send({error})
                else{
                    //console.log(place_name)
                    //console.log(weather_descriptions + `. Temprature is ${temperature} and feels like ${feelslike}`)
                    res.send({
                        address,
                        place_name,
                        forecast: `Current weather is ${weather_descriptions}. Temprature is ${temperature}°C, feels like ${feelslike}°C. Humidity is ${humidity}% with chance of rain ${precip}%`,
                        weather_icons, 
                        wind_data:`Pressure is ${pressure} mb.\nWind is blowing at speed ${wind_speed} Km/hr with direction ${wind_dir}`,
                        uv_index                        
                    })
                }
            })
        }    
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'Oh oh',
        errorMsg:"Help article not found",
        Author:"Mangirish"
    })
})

app.get('*',(req, res)=> {
    res.render('404', {
        title:'404',
        errorMsg:"Page not found",
        Author:"Mangirish"
    })
})

app.listen(port, (req, res) => {
    console.log('Server started on ' + port);
})
