const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Salaman Hamidkohzad'
    });
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
   
    geocode(req.query.address, (error, data) => {
        if(error){
            // return console.log(error);
            return res.send({
                error,
            })
        } 
        
        
        forecast(data, (error, body) => {
            if(error){
                // return console.log(error);
                return res.send({ error, })
            }
    
            
            

            res.send({
               
                name: req.query.address,
                country: body.location.country,
                temp: body.current.temperature,
                descr: body.current.weather_descriptions,
                precip: body.current.precip,
                feelslike: body.current.feelslike,
                humidity: body.current.humidity,
                weather_icon: body.current.weather_icons,
                is_day: body.current.is_day


            });
          })    
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: 'Error 404',
        name: 'Salaman Hamidkohzad'

    });
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});