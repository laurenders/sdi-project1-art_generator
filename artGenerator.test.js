const fs = require('fs')
const HTML = fs.readFileSync('./artGenerator.html', 'utf-8')  // this is a string with text from HTML file
const jsdom = require("jsdom");
const { document } = (new jsdom.JSDOM(HTML)).window;   // turns the HTML string into an HTML document object that you can access

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// mocking up a fake fetch function for testing purposes
let myFetch = (url) => {
  let data;
  // if the url includes 'artistOrCulture', we treat is as the first fetch for artist data
  if (url.indexOf('artistOrCulture') !== -1) {
    // make this fake data object
    data =  {"total":1,"objectIDs":[459123]}

  } else {
    // else we treat it as the second fetch for artwork data
    data = {
      "primaryImageSmall":"https://images.metmuseum.org/CRDImages/rl/web-large/DT3154.jpg",
      "title":"Madame Roulin and Her Baby",
      "artistDisplayName":"Vincent van Gogh",
      "objectEndDate":1888,
      "medium":"Oil on canvas",
    }
  }
  
  // this fetch returns a promise which will eventually resolve to this data
  return new Promise((resolve, reject) => resolve(data))
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// since artGenerator.js is not running in browser, we have to do the following:

// create a global variable for the document object
global.document = document

// giving other files access to the fetch function we created..but only the files we have imported in here
global.fetch = myFetch

// importing click handler function which was exported from artGenerator.js
const clickHandler = require('./artGenerator.js')


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Now we can actually run our tests

describe('Test Suite 1: Describe the click handler function', () => {

  // need async keyword because clickHandler is an async function and we want to await the result of clickHandler
  test('should append artistName to URL', async () => {
    ({artistURL, artistName, title, year, artist, imgURL, description} = await clickHandler('1'))
    expect(artistURL).toBe('https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=vincent van gogh');
  })

  test('should set artistName correctly', async () => {
    ({artistURL, artistName, title, year, artist, imgURL, description} = await clickHandler('1'))
    expect(artistName).toBe('Vincent van Gogh')
  })

  test('should set artwork Title correctly', async () => {
    ({artistURL, artistName, title, year, artist, imgURL, description} = await clickHandler('1'))
    expect(title.innerHTML).toBe("Madame Roulin and Her Baby")
  })

  test('should set artwork Year correctly', async () => {
    ({artistURL, artistName, title, year, artist, imgURL, description} = await clickHandler('1'))
    expect(year.innerHTML).toBe('1888')
  })

  test('should set artist HTML element correctly', async () => {
    ({artistURL, artistName, title, year, artist, imgURL, description} = await clickHandler('1'))
    expect(artist.innerHTML).toBe('Vincent van Gogh')
  })

  test('should set image URL correctly', async () => {
    ({artistURL, artistName, title, year, artist, imgURL, description} = await clickHandler('1'))
    expect(imgURL.src).toBe("https://images.metmuseum.org/CRDImages/rl/web-large/DT3154.jpg")
  })

  test('should set description HTML element correctly', async () => {
    ({artistURL, artistName, title, year, artist, imgURL, description} = await clickHandler('1'))
    expect(description.innerHTML).toBe('Oil on canvas')
  })

  test('should append artistName to URL', async () => {
    ({artistURL, artistName, title, year, artist, imgURL, description} = await clickHandler('2'))
    expect(artistURL).toBe('https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=auguste rodin');
  })
  

})