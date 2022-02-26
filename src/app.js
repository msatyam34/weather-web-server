const path = require('path')
const hbs = require('hbs')
const express = require('express')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const pubDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//set up static directry to serve
app.use(express.static(pubDirPath))

//set up handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Satyam Mishra'
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Satyam Mishra'
    })
})

app.get('/help',(req,res)=>{
    res.render('help', {
        title: 'Help',
        name: 'Satyam Mishra'
    })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'Please provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide some address'
        })
    }

    //const address = req.query.address

    geocode (req.query.address,(error,{latitude,longitude,location}={})=>{
    
        if(error){
            return res.send({
                error
            })}
        
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })}
            
            
                res.send({
                    
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
          })
        
    })

    // res.send([
    //     {forecast: 'It is raining'},
    //     {location: 'India'},
    //     {Address: req.query.address}
    // ])
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: 'Error',
        name: 'Satyam Mishra',
        error: 'Help page not found'
    })
})

app.get('*', (req,res)=>{
    res.render('error',{
        title: 'Error',
        name: 'Satyam Mishra',
        error: 'Page not found'
    })
})


app.listen(port,()=>{
    console.log('server is up and running')
})