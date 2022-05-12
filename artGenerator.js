// import fetch from 'node-fetch';
// import fs from "fs";
// Don't need fetch since we are performing fetch request in browser not node, browsers have their own version of fetch

// for text underneath image
let title = document.getElementById("title");
let year = document.getElementById("date");
let artistName = document.getElementById("artist");
let imgURL = document.getElementById("image");
let keywordName;


const clickHandler = (button) => {

  // let keywordURL = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q='
  let keywordURL = 'https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q='

  if (button === 'keyword1') {
    keywordURL += 'vincent%20van%20gogh'
    keywordName = 'Vincent van Gogh'
  } 

  else if (button === 'keyword2') {
    keywordURL += 'auguste%20rodin'
    keywordName = 'Auguste Rodin'

  } else if (button === 'keyword3') {
    keywordURL += 'donatello'
    keywordName = 'Donatello'

  } else if (button === 'keyword4') {
    keywordURL += 'auguste%20renoir'
    keywordName = 'Auguste Renoir'
  }

  // FIRST FETCH: get list of objects for the culture you're interested in

  fetch(keywordURL)

  .then((res) => {
    console.log(res.status);
    return res.json();
  })

  .then(data => {
      console.log(data)
      let objectArr = data.objectIDs;
      console.log(objectArr)
      let randIndex = Math.floor(Math.random() * objectArr.length);
      let randObjID = objectArr[randIndex];
      return randObjID;
  })

  .then(randObjID => {
    let artURL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + randObjID
    
    // SECOND FETCH: get information on the randomly selected piece of art

    fetch(artURL)

      .then((res2) => {
        return res2.json();
      })

      .then((data2) => {
        console.log(data2.artistDisplayName);
        if (keywordName === data2.artistDisplayName) {
          
          title.innerHTML = data2.title;
          year.innerHTML = data2.objectEndDate;
          artistName.innerHTML = data2.artistDisplayName;
          imgURL.src = data2.primaryImage;
          console.log(imgURL);
          return title, year, imgURL, artistName;
          
        } else {
          return;
        }
      })
      
    .catch(err => console.error(err))

  })

}

 // https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=french


// https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&artistOrCulture=trueq=japan


// https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=french