const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utilis/geocode')
const forecast = require('./utilis/forecast')

const app = express()

//express config
const publicDirPath = path.join(__dirname , '..')

const viewspath = path.join(__dirname,'/templates/views') 
const partialspath = path.join(__dirname, '/templates/partials')


//setup handler engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

//setup static directory
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
    title: 'Weather ..!',
    name: 'Stephen'
    })
   })

app.get('/about', (req, res) => {
    res.render('About', {
    title: 'About me',
    name: 'Stephen'
    })
   })

app.get('/help', (req, res) => {
    res.render('help', {
    title: 'Help page ',
    name: 'Stephen',
    helpText: 'this is the help text'
    })
   })

app.get('/weather', (req ,res) => {
    //res.send('<h1><i> Hello Express! on weather page </i></h1> <style> h1{ color : orange} </style>')
    if(!req.query.address){
        return res.send({
            error: 'you must provide a address term !'
        })
    }
    
    else{
        geocode(req.query.address ,(error , { latitude ,longitude,location} ={}) => {
        if(error){
            return res.send({error: error})
        }
        
            //console.log('Error ', error)
            //console.log('Data', data)
        
            forecast(latitude ,longitude , (error, forecastdata) => {
        
                if(error){
                    return res.send({error: error})
                }
                
                res.send({
                    forecast: forecastdata,
                    location,
                    address: req.query.address 
                })

                
              })
        })
        
        }

    
})

app.get('/products' , (req,res) =>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term !'
        })
    }

    console.log(req.query.search)
    res.send({
        products: {}
    })
    
})

app.get('/help/*', (req,res) =>{
    res.render('404' , {
       title: '404 for help' ,
       errormsg: 'Help artical not found.!',
       name : 'Stephen'
    })
})

app.get('*', (req,res) =>{
    res.render('404', {
        title : '404 error!',
        errormsg : '404 errors are always followed by a readable phrase which indicates the reason why the page could not be found as per the HTTP specification. 404 errors occur due to several reasons.',
        name : 'Stephen'
    })
})

app.listen(3000 , () =>{
    console.log('Server started on 3000 port')
})