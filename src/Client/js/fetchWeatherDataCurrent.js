
const fetchWeatherDataCurrent = async (lat, lng) => {
    console.log("fetch Weather data current is running")
    let weatherData = {}
    const apikey = '15232fa7a4cc4f9daf72453c6c5453dc'
    const url = `https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${lng}&key=${apikey}`
    const response = await fetch(url)
    try {
        let data = await response.json()
        weatherData = {weather: data}
        console.log(data.data, "fetch coords data")
    } catch (error){
        console.log(error, "error from weatherbit api")
    }
    return weatherData
    

}

export {fetchWeatherDataCurrent}