// setting variables for site elements so we can modify later
let title = document.getElementById("title");
let year = document.getElementById("date");
let artist = document.getElementById("artist");
let imgURL = document.getElementById("image");
let testImage = '';

// FUNCTION to show artwork when user clicks button
const clickHandler = async (button) => {    // can't use await (see below) unless you have async here

  let artistURL = 'https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q='

  if (button === '1') {
    artistURL += 'vincent%20van%20gogh'
    artistName = 'Vincent van Gogh'
  } 

  else if (button === '2') {
    artistURL += 'auguste%20rodin'
    artistName = 'Auguste Rodin'

  } else if (button === '3') {
    artistURL += 'winslow homer'
    artistName = 'Winslow Homer'

  } else if (button === '4') {
    artistURL += 'auguste%20renoir'
    artistName = 'Auguste Renoir'

  } else if (button === '5') {
    artistURL += 'gustave courbet'
    artistName = 'Gustave Courbet'
  }
  
  // await: returns data from async functions and uses it syncronously
  // await stops and doesn't move on until promise gets resolved, lets you use fetch as if it were syncronous
  let artistData = await fetch(artistURL)
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err))

  let artworkArr = artistData.objectIDs;

  // try to get no more than data 15 times
  for (let i = 0; i < 15; i++) {
    let randIndex = Math.floor(Math.random() * artworkArr.length);
    let randObjID = artworkArr[randIndex];
    let artURL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + randObjID
    
    let artworkData = await fetch(artURL)
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err))

    if (artistName === artworkData.artistDisplayName && artworkData.primaryImageSmall !== '') {
      title.innerHTML = artworkData.title;
      year.innerHTML = artworkData.objectEndDate;
      artist.innerHTML = artworkData.artistDisplayName;
      imgURL.src = artworkData.primaryImageSmall;
      break;
    }
    console.log('no image url or no exact name match: trying again')
  }
}   

clickHandler('1');


//module.exports = artGenerator;