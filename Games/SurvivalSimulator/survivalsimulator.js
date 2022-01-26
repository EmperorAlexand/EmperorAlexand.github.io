//Console greeting
console.log("Hi there!");

//GetElementById function
function get(id) {
    return document.getElementById(id);
}

//random
function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Charcter class
class char {
    constructor(id, index, icon, ) {
        this.id = id;
        this.index = index;
        this.icon = icon;
    }
}

//Characters
var characters = [];
var charNum = 0;

//Add charcter function
function addChar() {
    console.log("Character added!")
    var ul = get("characters");
    var newChar = document.createElement("li");
    newChar.setAttribute("id", "char" + String(charNum));
    ul.appendChild(newChar);
    characters.push(new char("char" + String(charNum), charNum, "Images/charactericon.png"));

    var img = document.createElement("img");
    var inputContainer = document.createElement("div");
    var nameInput = document.createElement("input");
    var genderSelect = document.createElement("select");
    var maleOption = document.createElement("option");
    var femaleOption = document.createElement("option");
    var noneOption = document.createElement("option");
    var lastChar = characters[characters.length - 1];
    var weaponSelect = document.createElement("select");
    var sword = document.createElement("option");
    var axe = document.createElement("option");
    var bow = document.createElement("option");

    img.src = lastChar.icon;
    img.setAttribute("class", "charimg");
    img.setAttribute("id", "img" + String(charNum));
    newChar.appendChild(img);
    nameInput.setAttribute("class", "nameinput");
    nameInput.setAttribute("id", "input" + String(charNum));
    weaponSelect.setAttribute("class", "weaponselect");
    weaponSelect.setAttribute("id", "weapon" + String(charNum));
    nameInput.placeholder = "Name";
    newChar.appendChild(inputContainer);
    inputContainer.appendChild(nameInput);
    inputContainer.setAttribute("class", "inputContainer");

    maleOption.innerHTML = "Male";
    femaleOption.innerHTML = "Female";
    noneOption.innerHTML = "None";

    sword.innerHTML = "Sword";
    axe.innerHTML = "Axe";
    bow.innerHTML = "Bow";

    inputContainer.appendChild(genderSelect);
    inputContainer.appendChild(weaponSelect);
    weaponSelect.appendChild(sword);
    weaponSelect.appendChild(axe);
    weaponSelect.appendChild(bow);
    genderSelect.appendChild(maleOption);
    genderSelect.appendChild(femaleOption);
    genderSelect.appendChild(noneOption);
    genderSelect.setAttribute("id", "gender" + String(charNum));
    genderSelect.setAttribute("class", "genderselect");
    maleOption.setAttribute("class", "genderoption");
    femaleOption.setAttribute("class", "genderoption");
    noneOption.setAttribute("class", "genderoption");
    charNum++;
}

//Remove character function
function remChar(char) {
    if (charNum) {
        console.log("Character removed!");
        get(char.id).remove();
        charNum--;
        characters.splice(char.index, 1);
    }
}

//Randomize characters
var surnameBool = true;
function toggleSurNames() {
    surnameBool = !surnameBool;
    if (surnameBool) {
        get("surnames").setAttribute("style", "background-color:lime;");
        get("surnames").innerHTML = "Surnames: On";
    } else {
        get("surnames").setAttribute("style", "background-color:red;");
        get("surnames").innerHTML = "Surnames: Off";
    }
}

function randomizeCharacters() {
    if (!charNum) {
        alert("You have no characters to randomize!");
        return;
    }
    var malenamearray = ["Alex", "Adam", "Benjamin", "Carl", "Casper", "David", "Eric", "Ferdinand", "Garfield", "Hector", "Ian", "Jacob", "Kyle", "Liam", "Michael", "Mike", "Nils", "Ottems", "Patrick", "Quentin", "Robert", "Sam", "Trevor", "Ulfred", "Victor", "William", "Willy", "Xerxes", "Yugi", "Zach"];
    var femalenamearray = ["Agnes", "Brittney", "Cassidy", "Daisy", "Emily", "Felicia", "Gabrielle", "Haylie", "Issabelle", "Jasmine", "Klara", "Lilly", "Michelle", "Nora", "Ophelia", "Patricia", "Quinn", "Rachael", "Sabina", "Tiffany", "Ursula", "Velma", "Willhelmina", "Xia", "Ylva", "Zoey"];
    var surnamearray = ["Adamson", "Bismark", "Cleveland", "De La Bordouniasse", "Ericsson", "Falco", "Gates", "Hilbert", "Isaacson", "Johnsson", "Karlssen", "Langley", "Moto", "Nielssen", "Orwell", "Parsson", "Queen", "Richardsson", "Samsson", "Tanner", "Underhill", "Victors", "Wattson"];
    var genderarray = ["Male", "Female"];
    var weaponarray = ["Sword", "Axe","Bow"];

    for (var i = 0; i < charNum; i++) {
        var newGender = genderarray[random(0, 1)];
        if (newGender == "Male") var newName = malenamearray[random(0, malenamearray.length - 1)];
        else var newName = femalenamearray[random(0, femalenamearray.length - 1)];
        if (surnameBool) newName += " " + surnamearray[random(0, surnamearray.length - 1)];
        var newWeapon = weaponarray[random(0, weaponarray.length - 1)];
        get("input" + String(i)).value = newName;
        get("gender" + String(i)).value = newGender;
        get("weapon" + String(i)).value = newWeapon;
    }
}

//Start game function
function startGame() {
    if (charNum < 2) {
        alert("You have too few characters!");
        return;
    }
    var charNames = [];
    var charGenders = [];
    var charWeapons = [];
    var charIcons = [];

    var deadcharNames = [];
    var deadcharGenders = [];
    var deadcharWeapons = [];
    var deadcharIcons = [];

    for (var i = 0; i < characters.length; i++) {
        charNames.push(get("input" + String(i)).value);
        charGenders.push(get("gender" + String(i)).value);
        charWeapons.push(get("weapon" + String(i)).value);
        charIcons.push(get("img" + String(i)).src);
    }

    localStorage.charNames = JSON.stringify(charNames);
    localStorage.charGenders = JSON.stringify(charGenders);
    localStorage.charWeapons = JSON.stringify(charWeapons);
    localStorage.charIcons = JSON.stringify(charIcons);

    localStorage.deadcharNames = JSON.stringify(deadcharNames);
    localStorage.deadcharGenders = JSON.stringify(deadcharGenders);
    localStorage.deadcharWeapons = JSON.stringify(deadcharWeapons);
    localStorage.deadcharIcons = JSON.stringify(deadcharIcons);

    localStorage.day = "1";
    window.location.href = "game.html";
}
