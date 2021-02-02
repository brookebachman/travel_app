const weatherBitWeekFetch = async function(req, res){
    console.log("hit weatherbit week weather api")
    const apikey = process.env.API_KEY_WEATHERBIT
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${req.body.lat}&lon=${req.body.lon}&key=${apikey}`
    try{
      let response = await fetch(url)
      let result = await response.json()
      const data = result.data
      console.log(result, "this is week data")
      res.json(data)
  
    }catch (error){
      console.log(error)
    }
  }

  module.exports = {weatherBitWeekFetch}