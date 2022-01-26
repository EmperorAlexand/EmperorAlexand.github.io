//Covenient functions
function id(i) {return document.getElementById(i)};
function class_(c) {return document.getElementsByClassName(c)};
function editText(element, text) {element.innerHTML = text;}
function editTitle(title) {document.title = title;}
function resize(i, h, w) {id(i).setAttribute("style", "height:" + String(h) + "px;width:" + String(w) + "px;")}
function create(elm_type) {return document.createElement(elm_type);}
function saveVar(str, v) {localStorage.setItem(str, String(v));}
function loadVar(str) {return localStorage.getItem(str);}
function saveArray(str, arr) {localStorage.setItem(str, JSON.stringify(arr));}
function loadArray(str) {return JSON.parse(localStorage.getItem(str));}

//Global variables
var totalDucks = 1;
var ducksPerClick = 1;
var ducksPerSecond = 0;

//Item variables
var itemsOwned = [0, 0, 0, 0, 0];
var itemCosts = [15, 120, 3000, 50000, 1000000];
var itemYields = [0.1, 0.5, 3, 20, 100];
var itemNames = ["autoclicker", "pond", "lake", "sea", "ocean"];

//Elements in page
var duckDisplay = id("duckdisplay");
var dpsDisplay = id("dpsdisplay");
var duckHitbox = id("duckhitbox");

//Functions
function addDucks(amount) {
    totalDucks += amount;
    editText(duckDisplay, String(abreviateNumber(Math.floor(totalDucks))) + " Ducks");
    editTitle(String(abreviateNumber(Math.floor(totalDucks))) + " Ducks");
}

function mainDuckClick() {
    addDucks(ducksPerClick);
}

function abreviateNumber(n) {
  const K = 1000;
  if (n > K ** 8) return (n / K ** 8).toFixed(2) + ' Septillion';
  if (n > K ** 7) return (n / K ** 7).toFixed(2) + ' Sextillion';
  if (n > K ** 6) return (n / K ** 6).toFixed(2) + ' Quintillion';
  if (n > K ** 5) return (n / K ** 5).toFixed(2) + ' Quadrillion';
  if (n > K ** 4) return (n / K ** 4).toFixed(2) + ' Trillion';
  if (n > K ** 3) return (n / K ** 3).toFixed(2) + ' Billion';
  if (n > K ** 2) return (n / K ** 2).toFixed(2) + ' Million';
  if (n > K) return (n/K).toFixed(2) + ' Thousand';
  return n;
}

function buyItem(item) {
    if (totalDucks >= itemCosts[item]) {

        var costMultiplier = 1.1;
        itemsOwned[item]++;
        totalDucks -= itemCosts[item];
        itemCosts[item] = Math.ceil(itemCosts[item] * costMultiplier);
        ducksPerSecond += itemYields[item];
        ducksPerSecond.toFixed(1);

        editText(id("amount_" + itemNames[item]), "Owned: " + String(itemsOwned[item]));
        editText(duckDisplay, String(abreviateNumber(Math.floor(totalDucks))) + " Ducks");
        editText(dpsDisplay, String(abreviateNumber(ducksPerSecond.toFixed(1))) + " Ducks per second");
        editText(id("cost_" + itemNames[item]), "Cost: " + String(abreviateNumber(itemCosts[item])));
        editTitle(String(Math.floor(totalDucks)) + " Ducks");
    }
}

//Saving and loading
function saveGame() {
    saveVar("totalDucks", totalDucks);
    saveVar("ducksPerSecond", ducksPerSecond);
    saveVar("ducksPerClick", ducksPerClick);
    saveArray("itemsOwned", itemsOwned);
    saveArray("itemCosts", itemCosts);
    saveArray("itemYields", itemYields);
}

function loadGame() {
    totalDucks = parseFloat(loadVar("totalDucks"));
    ducksPerSecond = parseFloat(loadVar("ducksPerSecond"));
    ducksPerClick = parseFloat(loadVar("ducksPerClick"));
    itemsOwned = loadArray("itemsOwned");
    itemCosts = loadArray("itemCosts");
    itemYields = loadArray("itemYields");

    editText(duckDisplay, String(abreviateNumber(Math.floor(totalDucks))) + " Ducks");
    editText(dpsDisplay, String(abreviateNumber(ducksPerSecond.toFixed(1))) + " Ducks per second");
    editTitle(String(Math.floor(totalDucks)) + " Ducks");

    for (var i = 0; i < itemNames.length; i++) {
        editText(id("cost_" + itemNames[i]), "Cost: " + String(abreviateNumber(itemCosts[i])));
        editText(id("amount_" + itemNames[i]), "Owned: " + String(itemsOwned[i]));
    }
}

//Earning your dps
setInterval(function() {
    addDucks(ducksPerSecond / 20);
}, 50);
