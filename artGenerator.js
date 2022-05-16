// setting variables for site elements so we can modify later
let title = document.getElementById("title");
let year = document.getElementById("date");
let artist = document.getElementById("artist");
let imgURL = document.getElementById("image");
let description = document.getElementById("description");
let artistName;
let bannedWords = ["Nude", "bather", "Bather", "bathing", "Bathing", "bath", "Bath", "parrot", "Baigneuses", "Wave", "source"];

// FUNCTION to show artwork when user clicks button
const clickHandler = async (button) => {    // can't use await (see below) unless you have async here
  let artistURL = 'https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q='

  if (button === '1') {
    artistURL += 'vincent van gogh'
    artistName = 'Vincent van Gogh'
  } 
  else if (button === '2') {
    artistURL += 'auguste rodin'
    artistName = 'Auguste Rodin'

  } else if (button === '3') {
    artistURL += 'winslow homer'
    artistName = 'Winslow Homer'

  } else if (button === '4') {
    artistURL += 'auguste renoir'
    artistName = 'Auguste Renoir'

  } else if (button === '5') {
    artistURL += 'gustave courbet'
    artistName = 'Gustave Courbet'
  }
  // await: returns data from async functions and uses it syncronously
  // await stops and doesn't move on until promise gets resolved, lets you use fetch as if it were syncronous
  let artistData = await fetch(artistURL)   // using fetch function, which is defined in the browser
    .then(res => {
      if (res.status) {
        return res.json()
      } else {
        return res
      }
    })
    .then(data => data)
    .catch(err => console.log(err))
  let artworkArr = artistData.objectIDs;

  // try to get no more than data 15 times
  for (let i = 0; i < 15; i++) {
    let randIndex = Math.floor(Math.random() * artworkArr.length);
    let randObjID = artworkArr[randIndex];
    let artURL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + randObjID
    
    let artworkData = await fetch(artURL)
    .then(res => {
      if (res.status) {
        return res.json()
      } else {
        return res
      }
    })
      .then(data => data)
      .catch(err => console.log(err))

      // Look for titles that contain any of the banned words and return true or false
      // if they do or dont have the words.
      const contains = bannedWords.some(element => {
        if (artworkData.title.includes(element)) {
          return true;
        }
        return false;
      });
      
    if (artistName === artworkData.artistDisplayName && artworkData.primaryImageSmall !== '' && !contains) {
      title.innerHTML = artworkData.title;
      year.innerHTML = artworkData.objectEndDate;
      artist.innerHTML = artworkData.artistDisplayName;
      imgURL.src = artworkData.primaryImageSmall;
      imgURL.className = 'picture-frame'
      description.innerHTML = '(' + artworkData.medium + ')';
      break;
    }
    console.log('no image url or no exact name match: trying again')
  }
  return {artistURL, artistName, title, year, artist, imgURL, description}
}   

try { // try to export clickHandler, if it fails, log the error without crashing program
  module.exports = clickHandler

} catch (err) {
  console.log(err)

  clickHandler('1');
}
