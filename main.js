let mainInputSearch = document.getElementById('mainInputSearch');
let locationInputSearch = document.getElementById('locationInputSearch');
let searchButton = document.getElementById('searchButton');
let restaurantNameHolder = document.getElementById('restaurantNameHolder');
let locationNameholder = document.getElementById ('locationNameholder');
let resultsmainInfoname = document.getElementById ('results-mainInfo-name');
let resultsmainInforeviews = document.getElementById ('results-mainInfo-reviews');
let resultsmainInfoprice = document.getElementById ('results-mainInfo-price');
let resultsmainInfocategories = document.getElementById('results-mainInfo-categories');
let resultslocationaddressandphonenumber = document.getElementById('results-location-addressandphonenumber');
let displayResultsArea = document.getElementById('displayResultsArea');
let oneDollarButton = document.getElementById('oneDollar');
let twoDollarButton = document.getElementById('twoDollar');
let threeDollarButton = document.getElementById('threeDollar');
let fourDollarButton = document.getElementById('fourDollar');
let resultsContainerContainer = document.getElementById('resultsContainerContainer');
let openNowButton = document.getElementById('openNow');

openNowButton.addEventListener('click', function(){
  let maininput = 'Best ' + mainInputSearch.value + ' in';
  let locationinput = locationInputSearch.value;
  let locationinputCapitalized = locationinput.charAt(0).toUpperCase() + locationinput.slice(1);
  let price = "1,2,3,4";
  let open = true;
  pullData(maininput, locationinputCapitalized, price, open);
})

searchButton.addEventListener('click', function() {
  let maininput = 'Best ' + mainInputSearch.value + ' in';
  let locationinput = locationInputSearch.value;
  let locationinputCapitalized = locationinput.charAt(0).toUpperCase() + locationinput.slice(1);
  let price = "1,2,3,4";
  let open = false;
  pullData(maininput, locationinputCapitalized, price, open);
});

oneDollarButton.addEventListener('click', function() {
  let maininput = 'Best ' + mainInputSearch.value + ' in';
  let locationinput = locationInputSearch.value;
  let locationinputCapitalized = locationinput.charAt(0).toUpperCase() + locationinput.slice(1);
  let price = "1";
  let open = false;
  pullData(maininput, locationinputCapitalized, price, open);
  /*
  console.log(storedValue);
  let yoyo = document.getElementById('results-mainInfo-price');
  let yoyoyo = yoyo.innerHTML;
  let resultsContainerContainer = document.getElementById('resultsContainerContainer');
    for (let i = 0; i<storedValue.length; i++) {
      if (storedValue[i].indexOf('$$') > -1) {
        storedValue.splice(0,1);
      } else if (storedValue[i].indexOf('$$$') > -1) {
        storedValue.splice(0,1);
      }
  }*/
});

twoDollarButton.addEventListener('click', function() {
  let maininput = 'Best ' + mainInputSearch.value + ' in';
  let locationinput = locationInputSearch.value;
  let locationinputCapitalized = locationinput.charAt(0).toUpperCase() + locationinput.slice(1);
  let price = "2";
  let open = false;
  pullData(maininput, locationinputCapitalized, price, open);
});

threeDollarButton.addEventListener('click', function() {
  let maininput = 'Best ' + mainInputSearch.value + ' in';
  let locationinput = locationInputSearch.value;
  let locationinputCapitalized = locationinput.charAt(0).toUpperCase() + locationinput.slice(1);
  let price = "3";
  let open = false;
  pullData(maininput, locationinputCapitalized, price, open);
});

fourDollarButton.addEventListener('click', function() {
  let maininput = 'Best ' + mainInputSearch.value + ' in';
  let locationinput = locationInputSearch.value;
  let locationinputCapitalized = locationinput.charAt(0).toUpperCase() + locationinput.slice(1);
  let price = "4";
  let open = false;
  pullData(maininput, locationinputCapitalized, price, open);
});


function pullData (maininput, locationinput, price, open) {
  echoSearch(maininput, locationinput);
  displayResultsArea.innerHTML = '';
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.yelp.com/v3/businesses/search?term=" + maininput + "&location=" + locationinput + "&price=" + price + "&open_now=" + open); //https://api.yelp.com/v3/businesses/search?term=&location=Boston
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
  let displayResultsAreaArray = [];
  for(let i=0;i<ourData.businesses.length;i++){
    displayResultsArea.innerHTML += '<div id="resultsContainerContainer"><div id="resultsContainer"><div id="results-image"><img style="width:100px;height:100px" src="' + ourData.businesses[i].image_url + '"></img></div><div id="results-mainInfo"><div id="results-mainInfo-name">' + (i+1) + ". " + '<a href="' + ourData.businesses[i].url + '">' + ourData.businesses[i].name + '</a></div><span id="results-mainInfo-rating">' + ourData.businesses[i].rating + " stars " + '</span><span id="results-mainInfo-reviews">' + '• ' + ourData.businesses[i].review_count + ' reviews' + '</span><br><span id="results-mainInfo-price">' + ourData.businesses[i].price + ' • </span><span id="results-mainInfo-categories">' + displayandResolveTitleIssuePlusSliceComma(i, ourData) + '</span></div><div id="results-location"><div id="results-location-addressandphonenumber">' +  ourData.businesses[i].location.address1 + '<br>' + ourData.businesses[i].location.display_address[1] + '<br>' + ourData.businesses[i].phone + '</div></div></div></div>';
    displayResultsAreaArray.push(displayResultsArea.innerHTML);
  }
  storedValue = displayResultsAreaArray; // may need later in this organized and easily accessible array format
  console.log(storedValue); // may need later in this organized and easily accessible array format
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
