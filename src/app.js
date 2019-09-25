const path =  require('path');
const express = require('express');
const hbs =  require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Setting up paths for express
//2nd argument manipulates the path in 1st  argument
const publicDir = path.join(__dirname, '../public'); 
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve(public)
app.use(express.static(publicDir));

app.get('', (req, res) => {
    //1st argument is the view to render and 2nd is the data to be passed to view
    res.render('index', {
        title: 'Weather App',
        name: 'Vaibhav'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpMessage: 'Here is a help message for you',
        name: 'Vaibhav'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page1',
        name: 'Vaibhav'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address',
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) return res.send({error});

        forecast(latitude, longitude, (error, {forecast}) => {
            if (error) return res.send({error});

            res.send({
                location,
                forecast
            });
        });
    });

});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help article not found',
        name: 'Vaibhav'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not Found',
        name: 'Vaibhav'
    })
});

//start listening on port 3000 of machine running the web server
app.listen(port, () => {
    console.log('Server is up on port ' + 3000);
})