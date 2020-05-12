const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewsPath)
app.use(express.static(publicPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Ayushman'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Ayushman'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'This is some help text.',
    name: 'Ayushman'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address)
    return res.send({
      error: 'Please provide an address'
    })

    geocode(req.query.address, (error, data) => {
      (error)
      ?
        res.send({
          error: error
        })
      :
        forecast(data.latitude,data.longitude, (error, forecastdata) => {
          (error)
          ?
            res.send(error)
          :
            res.send({
              forcast: forecastdata,
              address: req.query.address
            })
        })
    })
    

})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Not found',
    errorMessage: 'Help article not found.',
    name: 'Ayushman'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Not found',
    errorMessage: 'Page not found.',
    name: 'Ayushman'
  })
})


app.listen(3000, () => {
  console.log('Server is listening...')
})
