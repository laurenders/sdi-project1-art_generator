// const fs = require('fs')
// const HTML = fs.readFileSync('./artGenerator.html', 'utf-8')
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const { document } = (new JSDOM(HTML)).window;
// const artGenerator = require('./').artGenerator;

import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

const clickHandler = require('./artGenerator.js')

describe('Describe the click handler', () => {

  beforeEach(() =>{
    // let title = document.getElementById("title");
    // let year = document.getElementById("date");
    // let artist = document.getElementById("artist");
    // let imgURL = document.getElementById("image");
  })
  test('It should append Van Gogh name to the URL', () => {
    clickHandler('1')
    expect(artistURL).toBe('https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=vincent%20van%20gogh');
    expect(artistName).toBe('Vincent van Gogh')
  })
  test('It should append Auguste Rodin name to the URL', () => {
    clickHandler('2')
    expect(artistURL).toBe('https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=auguste%20rodin');
    expect(artistName).toBe('Auguste Rodin')
  })
  test('It should append Winslow Homer name to the URL', () => {
    clickHandler('3')
    expect(artistURL).toBe('https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=winslow%20homer');
    expect(artistName).toBe('Winslow Homer')
  })
  test('It should append Pierre-Auguste Renoir name to the URL', () => {
    clickHandler('4')
    expect(artistURL).toBe('https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=auguste%20renoir');
  })
  test('It should append Gustave Courbet name to the URL', () => {
    clickHandler('5')
    expect(artistURL).toBe('https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=gustav%20courbet');
  })

  test('It should select a random objectID from the artwork array', () => {
    let artworkArr = [10294, 10394, 49694, 10595, ]
    expect(artistURL).toBe('https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=gustav%20courbet');
  })



})