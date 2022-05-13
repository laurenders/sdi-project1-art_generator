//const artGenerator = require('./').artGenerator;
describe('Describe the click handler', () => {

  beforeEach(() =>{
    let title = document.getElementById("title");
    let year = document.getElementById("date");
    let artist = document.getElementById("artist");
    let imgURL = document.getElementById("image");
  })

  test('It should update the URL to navigate to Van Gogh', () => {
    clickHandler('1')
    expect(artistURL).toBe('https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=vincent%20van%20gogh');
  })
})