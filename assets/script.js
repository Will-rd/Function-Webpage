// HTML Elements

var characterNameInput = document.querySelector(".input");
var heroName = document.querySelector(".heroName")
var heroImage = document.querySelector(".heroInfo")
var heroComics = document.querySelector(".comicList")
var formEl = document.getElementById("form");
var inputEl = document.getElementById("specificSizeInputName");
var errors = 0;
var comicsPresent = false;

//Creating a function to call inside of the event listener to fetch data from an alternate API to append marvel charachter or villain stats and info

function getStats() {
    var statCard = document.getElementById('hero-specbox');
    var getStat = characterNameInput.value;
    var statUrl = 'https://superheroapi.com/api.php/10226672695516002/search/' + getStat;

    fetch(statUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var i = 0; i < data.results.length; i++) {
                var dataArray = data.results[i];
                if (dataArray.name === getStat) {
                    var cardEl = document.createElement('h1');
                    cardEl.setAttribute("class", "comicCard col-md-5 p-3 mb-2 bg-dark text-info font-weight-bold");
                    cardEl.setAttribute("style", "width: 20rem");
                    cardEl.textContent = dataArray.name + " stats:";

                    var alignBox = document.createElement('h4');
                    alignBox.textContent ="Alignment: " + dataArray.biography.alignment;
                    cardEl.appendChild(alignBox);

                    var occBox = document.createElement('h4');
                    occBox.textContent ="Occupation: " + dataArray.work.occupation;
                    cardEl.appendChild(occBox);

                    var strBox = document.createElement('h4');
                    strBox.textContent = 'Strength: ' + dataArray.powerstats.strength;
                    var comBox = document.createElement('h4');
                    comBox.textContent = 'Combat: ' + dataArray.powerstats.combat;
                    var intBox = document.createElement('h4');
                    intBox.textContent = 'Intelligence: ' + dataArray.powerstats.intelligence;
                    var spdBox = document.createElement('h4');
                    spdBox.textContent = 'Speed: ' + dataArray.powerstats.speed;
                    var durBox = document.createElement('h4');
                    durBox.textContent = 'Durability: ' + dataArray.powerstats.durability;
                    cardEl.appendChild(strBox);
                    cardEl.appendChild(comBox);
                    cardEl.appendChild(intBox);
                    cardEl.appendChild(spdBox);
                    cardEl.appendChild(durBox);

                    statCard.appendChild(cardEl);
                }
            }



        })
    return;
}

var imageHero = document.querySelector(".imageBox")
var searchButton = document.querySelector(".search");

function removePrevious(){
    var comicCards = document.querySelectorAll(".comicCard");
    var imageElement = document.querySelector(".imageBox img");
    var nameElement = document.querySelector(".heroName h2");
    

    for(x=0;x<comicCards.length;x++){
        comicCards[x].remove();
    }

    // Delete the hero image, name and comic list
    imageElement.remove();
    nameElement.remove();
}

function removeerror(){
    if(errors>0){
        var message = document.getElementById("errormessage");
        message.remove();
        errors=0;
    }
}
// This is the the line to make the button interactive
searchButton.addEventListener("submit", function (event) {
    event.preventDefault();
    if(comicsPresent){
        removePrevious();
    }
    getStats();
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
            var error = document.createElement("div");
            error.innerHTML = "Error. No characters were found. Check spelling.";
            error.setAttribute("style", "color:white;");
            error.className = "col-auto";
            error.setAttribute("id", "errormessage");
            formEl.appendChild(error);
            formEl.addEventListener("submit", removeerror);
            inputEl.addEventListener("focus", removeerror);
            errors = 1;
            return;
        }
        var charID = data.data.results[0].id;       

            // Hero image on card
            var thumbImage = document.createElement("img")
            imageHero.appendChild(thumbImage)
            thumbImage.setAttribute("src", data.data.results[0].thumbnail.path + "." + data.data.results[0].thumbnail.extension);

            // Hero name element on card
            var charName = document.createElement("h2");
            charName.textContent = data.data.results[0].name;
            heroName.appendChild(charName);

            localStorage.setItem("Hero Name",JSON.stringify(character));

            // Second fetch to obtain comic list
            var comicsURL = "https://gateway.marvel.com:443/v1/public/characters/" + charID + "/comics?ts=1&characterId=" + charID + "&orderBy=-issueNumber&apikey=cd73d5145c7087c52ee70053e3cce481&hash=964657b7e339d5a0e89b1e4538d81e94";
            fetch(comicsURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {

                    for (var i = 0; i < 5; i++) {

                        var comicCard = document.createElement("div");
                        comicCard.className = "comicCard";
                        comicCard.setAttribute("style", "align-items: center; border-radius:10px; background-color: #ED1D24; color: white; text-decoration: underline; display:flex; justify-content:space-between; margin:5px 0px;")
                        heroComics.appendChild(comicCard);
                        var comicTitle = document.createElement("div");
                        comicCard.appendChild(comicTitle);
                        comicTitle.setAttribute("style", "font-size:30px; padding-left: 7px;")
                        var comicImg = document.createElement("img");
                        comicCard.appendChild(comicImg);
                        comicTitle.textContent = data.data.results[i].title;
                        comicImg.setAttribute("src", data.data.results[i].thumbnail.path + "." + data.data.results[i].thumbnail.extension);
                        comicImg.className = "comicImg";

                    }
                    comicsPresent = true;
                })
        })

})
