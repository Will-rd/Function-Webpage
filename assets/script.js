// HTML Elements

var characterNameInput = document.querySelector(".input");
var heroName = document.querySelector(".heroName")
var heroImage = document.querySelector(".heroInfo")
var heroComics = document.querySelector(".comicList")
var imageHero = document.querySelector(".imageBox")

var searchButton = document.querySelector(".search");

// This is the the line to make the button interactive
searchButton.addEventListener("submit", function(event) {
    event.preventDefault();

    var character = characterNameInput.value;

// Api for name, ID and image retrieved from character name input 
    var charURL = "https://gateway.marvel.com:443/v1/public/characters?ts=1&name=" + character + "&apikey=cd73d5145c7087c52ee70053e3cce481&hash=964657b7e339d5a0e89b1e4538d81e94";
// First fetch call to obtain character name, ID and image
    fetch(charURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        if(data.data.results.length<1){
            // Add error message because no character with that name was found
            return;
        }
        console.log(data);
        var charID = data.data.results[0].id;
        console.log(charID);

        // Hero image on card
        var thumbImage = document.createElement("img")
        imageHero.appendChild(thumbImage)
        thumbImage.setAttribute("src",data.data.results[0].thumbnail.path + "." + data.data.results[0].thumbnail.extension);
        console.log(thumbImage);

        // Hero name element on card
        var charName = document.createElement("h2");
        charName.textContent = data.data.results[0].name;
        heroName.appendChild(charName);
       
        console.log(charName);

        // Second fetch to obtain comic list
        var comicsURL = "https://gateway.marvel.com:443/v1/public/characters/" + charID + "/comics?ts=1&characterId=" + charID + "&orderBy=-issueNumber&apikey=cd73d5145c7087c52ee70053e3cce481&hash=964657b7e339d5a0e89b1e4538d81e94";
        fetch(comicsURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);

            for(var i=0; i< 5; i++ ){

            var comicTitles = document.createElement("li")
            comicTitles.textContent = data.data.results[i].title;
            heroComics.appendChild(comicTitles)
            console.log(comicTitles);
            }
        })
    })

})