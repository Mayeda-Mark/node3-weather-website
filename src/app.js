const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up statis directory to serve
app.use(express.static(publicDirectoryPath));

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mark Mayeda'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mark Mayeda'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Help! I need somebody. Help! Not just anybody. Help! You know, I need someone. HELP!',
        name: 'Mark Mayeda'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address is required'
        });
    }
    const address = req.query.address;
    geoCode(address, (error, {latitude, longitude, location} = {}) => {
        if(!address){
          res.send(error);
        } else{
          if(error) {
              res.send({ error });
            }
          forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                res.send({ error });
            }
            res.send({
                location,
                forecastData,
                address: req.query.address
            });
          })
        }
      });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'help article not found!',
        title: '404: Article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        title: '404: Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});