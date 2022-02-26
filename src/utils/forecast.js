const request = require('request')


const forecast = (latitude, longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=1a8adac35ab1116b21b6c57ebfaef667&query='+latitude+','+longitude+'&units=m'
    

    request({url, json: true},(error,{body})=>{
           if(error){
           callback('Unable to connect to network',undefined)
           } else if(body.error){
           callback('Please check the coordinates, unable to find the location',undefined)

           } else{
           const currTemp = body.current.temperature
           const likeTemp = body.current.feelslike
           callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+ currTemp +' degrees out. But, it feels like '+ likeTemp + ' degrees out. The humidity is '+body.current.humidity+' %')
           }
    })

}

module.exports = forecast