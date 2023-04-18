// Marvel api keys
// Api for name, ID and image retrieved from character name input
var apiId = `https://gateway.marvel.com:443/v1/public/characters?name=${characterNameInput}&apikey=4c4e033b3ac0f5438b92c56a3014fddb`;
// Api for comic list retrieved from ID result
var apiComic = "https://gateway.marvel.com:443/v1/public/comics?characters=1009220&limit=20&apikey=4c4e033b3ac0f5438b92c56a3014fddb";
var characterNameInput = document.querySelector(".input");
var searchButton = document.querySelector(".search");

// This is the the line to make the button interactive
searchButton.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log("This button works!");

    var character = characterNameInput.value;
    console.log(character);
// First fetch call to obtain character name, ID and image
    fetch(apiId)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })

})