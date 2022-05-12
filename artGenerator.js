// import fetch from 'node-fetch';
// import fs from "fs";
// Don't need fetch since we are performing fetch request in browser not node, browsers have their own version of fetch


 


let title = document.getElementById("title");
let year = document.getElementById("date");
let imgURL = document.getElementById("image");


const clickHandler = (artist) => {
  let artistURL = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q='
  if (artist =='vangogh') {
    artistURL += 'vincent%20van%20gogh'
  } 

  else if (artist == 'monet') {
    artistURL += 'claude%20monet'
  }

  else if (artist == 'vinci') {
    artistURL += 'leonardo%20da%20vinci'

  } else {
    artistURL += 'august%20renoir'
  }

  // FIRST FETCH
  fetch(artistURL)

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

    // SECOND FETCH
    fetch(artURL)

      .then((res2) => {
        return res2.json();
      })

      .then((data2) => {
        title.innerHTML = data2.title;
        year.innerHTML = data2.objectEndDate;
        imgURL.src = data2.primaryImage;
        console.log(imgURL);

        return title, year, imgURL
      })
      
    .catch(err => console.error(err))

  })

}

 

