var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.yelp.com/v3/businesses/four-barrel-coffee-san-francisco");
var token = "uvEpaMfUen7h-xkn-aVLdjTsKBbWT5dyDIqba9o3wErJI-ZOkBcmdzHXvSVGn0Zn2HpYUfH59vmLhIZP3nb-ClLaedz1_fx36NgOazhZJGjCHsSJ-vmdY5zfAG8XWnYx";
xhr.setRequestHeader('Authorization', 'Bearer ' + token);
xhr.onload = function() {
  let ourData = JSON.parse(xhr.responseText);
  console.log(ourData);
}
xhr.send();


function Restaurant (name, address, rating) {
  this.name = name;
  this.address = address;
  this.rating = rating;

  this.display = function () {
    return this.name;
  }
}

let sabrinasCafe = new Restaurant("Sabrina's Cafe", "227 N 34th St.", "5 star");
let McDonalds = new Restaurant("McDonalds", "3935 Walnut St.", "3 star");
let Chipotle = new Restaurant("Chipotle", "3400 Lancaster Ave.", "4 star");
let Starbucks = new Restaurant("Starbucks", "3421 Chestnut St.", "4 star");
let Saxbys = new Restaurant("Saxby's", "2951 Market St.", "5 star");

let restaurants =[sabrinasCafe,McDonalds,Chipotle,Starbucks,Saxbys];

let mainSearchElement = document.getElementById('mainSearch');

document.getElementById('mainSearchButton').addEventListener ('click', compareAndSearch);
let displayRestaurantInfoText = document.getElementById('displayRestaurantInfo');

function compareAndSearch () {
  for (let i=0; i<restaurants.length; i++) {
    if (mainSearchElement.value === restaurants[i].name) {
      displayRestaurantInfoText.innerHTML = "Here is some information about " + restaurants[i].name + "<br>" + "Address: " + restaurants[i].address + "<br>" + " Rating: " + restaurants[i].rating;
    }
  }
}

function infoDisappear () {
  displayRestaurantInfoText.innerHTML ="";
}

function infoAppear0 () {
  displayRestaurantInfoText.innerHTML = "Here is some information about " + restaurants[0].name + "<br>" + "Address: " + restaurants[0].address + "<br>" + " Rating: " + restaurants[0].rating;
}

function infoAppear1 () {
  displayRestaurantInfoText.innerHTML = "Here is some information about " + restaurants[1].name + "<br>" + "Address: " + restaurants[1].address + "<br>" + " Rating: " + restaurants[1].rating;
}

function infoAppear2 () {
  displayRestaurantInfoText.innerHTML = "Here is some information about " + restaurants[2].name + "<br>" + "Address: " + restaurants[2].address + "<br>" + " Rating: " + restaurants[2].rating;
}

function infoAppear3 () {
  displayRestaurantInfoText.innerHTML = "Here is some information about " + restaurants[3].name + "<br>" + "Address: " + restaurants[3].address + "<br>" + " Rating: " + restaurants[3].rating;
}

function infoAppear4 () {
  displayRestaurantInfoText.innerHTML = "Here is some information about " + restaurants[4].name + "<br>" + "Address: " + restaurants[4].address + "<br>" + " Rating: " + restaurants[4].rating;
}

document.getElementById('shareBtn').onclick = function() {
  FB.ui({
    method: 'share',
    display: 'popup',
    href: 'https://www.mcdonalds.com/us/en-us.html',
  }, function(response){});
}

/*
function changeText(input) {
  input.innerHTML = "No restaurants found!";
}

var penis = document.getElementById("inputBox");
var headerValue = document.getElementById("theHeader");

document.getElementById("buttonChangeHeaderName").addEventListener("click", function () {
  var storedValue = penis.value;
  headerValue.innerHTML = '';
  headerValue.innerHTML = storedValue;
});

*/
