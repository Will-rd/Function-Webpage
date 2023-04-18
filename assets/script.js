// HTML Elements

var characterNameInput = document.querySelector(".input");

// Marvel api keys
// Api for name, ID and image retrieved from character name input
// Api for comic list retrieved from ID result
var apiComic = "https://gateway.marvel.com:443/v1/public/comics?characters=1009220&limit=20&apikey=4c4e033b3ac0f5438b92c56a3014fddb";

var searchButton = document.querySelector(".search");

// This is the the line to make the button interactive
searchButton.addEventListener("submit", function(event) {
    event.preventDefault();

    var character = characterNameInput.value;
    var charURL = "https://gateway.marvel.com:443/v1/public/characters?ts=1&name=" + character + "&apikey=cd73d5145c7087c52ee70053e3cce481&hash=964657b7e339d5a0e89b1e4538d81e94";
// First fetch call to obtain character name, ID and image
    fetch(charURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        if(data.data.results.length<1){
            return;
        }
        console.log(data);
        var charID = data.data.results[0].id;
        console.log(charID);
    })

})