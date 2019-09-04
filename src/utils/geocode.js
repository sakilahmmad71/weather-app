const request = require('request')


const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoic2FraWxhaG1tYWQ3MSIsImEiOiJjanpzZWVjdTgwMzIzM2NwY2duaWxtcXdxIn0.xekBHmZ28hVD18om3abjrA`

    request({ url, json : true}, (error, { body : { features } }) => {
        if(error) {
            callback(`Unable to connect to the internet!`, undefined)
        } else if(features.length === 0) {
            callback(`Location Not Found. Try another search`, undefined)
        } else {
           callback(undefined, {
               longitude : features[0].center[0],
               latitude : features[0].center[1],
               location : features[0].place_name
           })
        }
    })
}

module.exports = geoCode