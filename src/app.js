const path = require('path')
const express = require('express')
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlears engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title : 'weather App',
        name : 'Sakil Mahmud'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About me',
        name : 'Sakil Mahmud'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help Center',
        message : 'We can help you, if you provide your problem information to us.',
        name : 'Sakil Mahmud'
    })
})

// Main tasks here
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error : 'Must provide an address.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {} ) => {
        if(error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })
})

// app.get('/product', (req, res) => {
//     if(!req.query.search) {
//         return res.send({
//             error : 'Need to search something'
//         })
//     }

//     res.send({
//         products : []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : 'Not Found.',
        name : 'Sakil Mahmud',
        errorMessage : 'Help Article Not Found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Sakil Mahmud',
        errorMessage : 'Page Not Found.'
    })
})

app.listen(3000, () => {
    console.log('Server running on port 3000.')
})