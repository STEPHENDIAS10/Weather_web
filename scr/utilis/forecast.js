const request = require('postman-request')
const forecast = (latitude,longitude , callback) => {

const url = 'http://api.weatherstack.com/current?access_key=4c6e05c0f9985fb11f3a422a59935806&query='+ latitude +','+ longitude + '&units=m'

request({ url, json: true} , (error, { body }) =>{
    //console.log(response.body.current)
    if(error){
        callback('un able to connect ', undefined)
        
    }else if(body.error){
        callback('Unable to find location',undefined)
    }else{ 
    callback(undefined , body.current.weather_descriptions[0] +"  Recentely it is "+ body.current.temperature + " degrees but feel like "+ body.current.feelslike + " degrees ")
    }
})
}

module.exports = forecast