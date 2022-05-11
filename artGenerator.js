// import fetch from 'node-fetch';
// import fs from "fs";
// Don't need fetch since we are performing fetch request in browser not node, browsers have their own version of fetch


/////////////////////////////////////////////////////////////////////////////
// STEP 1: Get User Input (user clicks Artist button)
/////////////////////////////////////////////////////////////////////////////

// Get selection from user click event, which returns an artist 
// Based on selected artist, append that artist's name to artist URL

// let selection = userClickEvent()

// let artistURL = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=' + `${buttonID}`

const clickHandler = (artist) => {
  console.log(artist)
}


/////////////////////////////////////////////////////////////////////////////
// STEP 2: Get a list of Object Record IDs for that artist (2 fetches)
/////////////////////////////////////////////////////////////////////////////

// Fetch request to the artistURL which returns the list of objectIDs

// Randomly generate a value based on the length of the objectIDs list and select the objectID at that index


/////////////////////////////////////////////////////////////////////////////
// STEP 3 Randomly select an art piece, or objectID from the list
/////////////////////////////////////////////////////////////////////////////

// Fetch request to the objectRecordURL and return data for the image, title, and year

// let objectRecordURL = https://collectionapi.metmuseum.org/public/collection/v1/objects/[objectID]




/////////////////////////////////////////////////////////////////////////////
// STEP 4: Get artwork image, artwork title, and artwork year
/////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////
// STEP 5: Display image, title, and year on webpage
/////////////////////////////////////////////////////////////////////////////