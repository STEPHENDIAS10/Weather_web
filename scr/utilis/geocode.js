const request = require('postman-request')
const geocode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic3RlcGhlbmRpYXMiLCJhIjoiY2txaHJpeTB0Mmd0ajJvcXRubnc5YXNxMCJ9.5DOfTG60mKvvG_HwX49M0A&limit=1'

    request({ url : url, json: true} , (error, { body }) =>{

        if(error){
            callback('No internet',undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location',undefined)
        }else{
            callback( undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                }) 
            }   
    })
}

module.exports = geocode