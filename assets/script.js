// HTML Elements

var characterNameInput = document.querySelector(".input");

// Marvel api keys
// Api for name, ID and image retrieved from character name input
// Api for comic list retrieved from ID result

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
            // Add error message because no character with that name was found
            return;
        }
        console.log(data);
        var charID = data.data.results[0].id;
        console.log(charID);
        var thumb = data.data.results[0].thumbnail.path + "." + data.data.results[0].thumbnail.extension;
        console.log(thumb);
        var charName = data.data.results[0].name;
        console.log(charName);

        var comicsURL = "https://gateway.marvel.com:443/v1/public/characters/" + charID + "/comics?ts=1&characterId=" + charID + "&orderBy=-issueNumber&apikey=cd73d5145c7087c52ee70053e3cce481&hash=964657b7e339d5a0e89b1e4538d81e94";
        fetch(comicsURL)
        .then(function(response2){
            return response2.json();
        })
        .then(function(data2){
            console.log(data2);
        })
    })

})