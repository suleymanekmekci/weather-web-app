const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// dynamic routing settings from here
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Suleyman Ekmekci'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Suleyman Ekmekci'
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "You must provide a address term"
        })
    }

    geocode(req.query.address, (error, geoData = {}) => {

        if (error) return res.send({ error });



        forecast(geoData.longitude, geoData.latitude, 'm', (error, forecastData) => {
            if (error || forecastData == undefined) return res.send({ error });

            res.send({
                forecast: forecastData,
                location: geoData.place,
                address: req.query.address

            })
        })
    })


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})



app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: '404 not found!',
        title: '404',
        name: 'Suleyman Ekmekci'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})