
const fetchWeatherDataCurrent = async (coordData, date) => {
    console.log("fetch Weather data current is running", coordData)
    let weatherData = {}
    const apikey = '15232fa7a4cc4f9daf72453c6c5453dc'
    const url = `https://api.weatherbit.io/v2.0/current?&lat=39.74911&lon=-104.99459&key=${apikey}`
    const response = await fetch(url)
    try {
        let data = await response.json()
        weatherData = {weather: data}
        console.log(data, "fetch coords data")
    } catch (error){
        console.log(error, "error from weatherbit api")
    }
    return weatherData
    

}

export {fetchWeatherDataCurrent}