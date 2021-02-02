import fetchMock from 'jest-fetch-mock'
fetchMock.enableMocks()

 const  { weatherBitWeekFetch} = require('../src/Server/fetchWeatherBitWeek')

it("Returns data", async ()=> {
    fetch.mockResponseOnce(JSON.stringify(
        {data: "hello world"}
    ))
    const response = {json: (data)=> {
        expect(data).toEqual("hello world")
    }}
    const request = {body: {lat: -137.00, lon: 87.00}}

    await weatherBitWeekFetch(request, response)
})