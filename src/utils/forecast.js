const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/42178cbed68a60546a332b46f0514e14/${longitude},${latitude}`
    request({ url, json : true}, (error, { body }) => {
        if(error) {
            callback(`Unable to connect to the internet!`, undefined)
        } else if(body.error) {
            callback(`Unable to find the given location`, undefined)
        } else {
            callback(undefined, {
                weather : body.currently.temperature,
                rainPossibility : body.currently.precipProbability,
                day : body.currently.icon
            })
        }
    })
}

module.exports = forecast