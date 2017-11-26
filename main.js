let mainInputSearch = document.getElementById('mainInputSearch');
let locationInputSearch = document.getElementById('locationInputSearch');
let searchButton = document.getElementById('searchButton');
let restaurantNameHolder = document.getElementById('restaurantNameHolder');
let locationNameholder = document.getElementById ('locationNameholder');
let resultsmainInfoname = document.getElementById ('results-mainInfo-name');
let resultsmainInforeviews = document.getElementById ('results-mainInfo-reviews');
let resultsmainInfoprice = document.getElementById ('results-mainInfo-price');
let resultslocationaddressandphonenumber = document.getElementById('results-location-addressandphonenumber');
let displayResultsArea = document.getElementById('displayResultsArea');

searchButton.addEventListener('click', function() {
  let maininput = 'Best ' + mainInputSearch.value + ' in';
  let locationinput = locationInputSearch.value;
  let locationinputCapitalized = locationinput.charAt(0).toUpperCase() + locationinput.slice(1);
  pullData(maininput, locationinputCapitalized);
});

function pullData (maininput, locationinput) {
  echoSearch(maininput, locationinput);
  displayResultsArea.innerHTML = '';
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.yelp.com/v3/businesses/search?term=" + maininput + "&location=" + locationinput); //https://api.yelp.com/v3/businesses/search?term=&location=Boston
  let token = "uvEpaMfUen7h-xkn-aVLdjTsKBbWT5dyDIqba9o3wErJI-ZOkBcmdzHXvSVGn0Zn2HpYUfH59vmLhIZP3nb-ClLaedz1_fx36NgOazhZJGjCHsSJ-vmdY5zfAG8XWnYx";
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  xhr.onload = function() {
    let ourData = JSON.parse(xhr.responseText);
    console.log(ourData);
    displayResults(ourData);
  }
  xhr.send();
}

function echoSearch(maininput, locationinput) {
  restaurantNameHolder.innerHTML = maininput;
  locationNameholder.innerHTML = locationinput;
}

function displayResults(ourData) {
  for(let i=0;i<ourData.businesses.length;i++){
  displayResultsArea.innerHTML += '<div id="resultsContainerContainer"><div id="resultsContainer"><div id="results-mainInfo"><div id="results-mainInfo-name">' + ourData.businesses[i].name + '</div><div id="results-mainInfo-reviews">' + ourData.businesses[i].review_count + ' reviews' + '</div><div id="results-mainInfo-price">' + ourData.businesses[i].price + ' • ' + displayandResolveTitleIssuePlusSliceComma(i, ourData) + '</div></div><div id="results-location"><div id="results-location-addressandphonenumber">' +  ourData.businesses[i].location.address1 + '<br>' + ourData.businesses[i].location.display_address[1] + '<br>' + ourData.businesses[i].phone + '</div></div></div></div>';
  }
}

function displayandResolveTitleIssuePlusSliceComma (number, ourData) {
  let value = displayandResolveTitleIssue(number, ourData);
  if (value.indexOf(',') > -1) {
    let realValue = value.slice(0, value.length - 2);
    return realValue;
  } else {
    return value;
  }
}

function displayandResolveTitleIssue (number, ourData) {
  let array = [];
  for (let i=0;i<ourData.businesses[number].categories.length;i++){
    if (ourData.businesses[number].categories.length < 2) {
      array += ourData.businesses[number].categories[i].title;
    } else if (ourData.businesses[number].categories.length > 1 && ourData.businesses[number].categories.length < 3) {
      array += ourData.businesses[number].categories[i].title + ', ';
    } else if (ourData.businesses[number].categories.length > 2 && ourData.businesses[number].categories.length < 4) {
      array += ourData.businesses[number].categories[i].title + ', ';
      }
    }
    return array;
  }
