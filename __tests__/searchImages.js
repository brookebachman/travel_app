import fetchMock from 'jest-fetch-mock'
fetchMock.enableMocks()



const {searchImages} = require('../src/Client/js/updateFrontend.js')

beforeEach(()=> {
    fetch.mockClear()
})

it("Returns an image URL", async ()=> {
    fetch.mockResponseOnce(JSON.stringify(
        {
            hits: [{
                tags: "s  un fun in   ", largeImageURL: "mockurl.com"
            }]
        })
    )
    
    const result = await searchImages('sun')

    expect(result).toEqual('mockurl.com')
})

