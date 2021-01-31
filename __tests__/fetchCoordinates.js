const {fetchCoordinates} = require('../src/Client/js/fetchCoordinates.js')

const fakeEvent = {
    preventDefault(){
        return true
    }
}
let data;

window.Client = {postToFrontend() {
    return true
}}

window.fetch = () => {
    return new Promise(function(resolve, reject){
        console.log("first.then")
        resolve({
            json(){
                return new Promise ((resolve)=> {
                    console.log("second.then")
                    resolve(data)
                })
            }
        })
    })
}


test('Sees that the user receives api data back', async () => {
    data = {timezone: 'America/Denver',country_code: 'US',city_name: 'Denver'}
    const result = await fetchCoordinates(fakeEvent, "http://localhost:8081/test")
    expect(result.hasOwnProperty("country_code")).toBe(true)
})