//Charcter class
class char {
    constructor(name, gender, weapon, id, index, icon) {
        this.name = name;
        this.gender = gender;
        this.weapon = weapon;
        this.id = id;
        this.index = index;
        this.icon = icon;
        if (gender == "Male") {
            this.pronoun1 = "he";
            this.pronoun2 = "his";
        } else if (gender == "Female") {
            this.pronoun1 = "she";
            this.pronoun2 = "her";
        } else {
            this.pronoun1 = "they";
            this.pronoun2 = "their";
        }
    }
}

//random
function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Random char
function randomchar(_char) {
    while (true) {
        var randomChar = characters[random(0, characters.length - 1)];
        if (randomChar != _char) return randomChar;
    }
}

//Random name
function randomname(name) {
    while (true) {
        var randomName = characters[random(0, characters.length - 1)].name;
        if (randomName != name) return randomName;
    }
}

//Day
var day = parseInt(localStorage.day);
document.getElementById("title").innerHTML = "Day " + String(day);

//Getting character data
var charNames = JSON.parse(localStorage.charNames);
var charGenders = JSON.parse(localStorage.charGenders);
var charWeapons = JSON.parse(localStorage.charWeapons);
var charIcons = JSON.parse(localStorage.charIcons);

var deadcharNames = JSON.parse(localStorage.deadcharNames);
var deadcharGenders = JSON.parse(localStorage.deadcharGenders);
var deadcharWeapons = JSON.parse(localStorage.deadcharWeapons);
var deadcharIcons = JSON.parse(localStorage.deadcharIcons);

var characters = [];
var deadCharacters = [];
var charNum = -1;

//Creating character objects
for (var i = 0; i < charNames.length; i++) {
    let newChar = new char(charNames[i], charGenders[i], charWeapons[i], "char" + String(i), i, charIcons[i]);
    characters.push(newChar);
    charNum++;
}
for (var i = 0; i < deadcharNames.length; i++) {
    let newChar = new char(deadcharNames[i], deadcharGenders[i], deadcharWeapons[i], "char" + String(i), i, deadcharIcons[i]);
    deadCharacters.push(newChar);
}

//Creating story
var ul = document.createElement("ul");
document.body.appendChild(ul);
for (var i = 0; i <= random(10, 20); i++) {

    //Win
    if (!charNum) {
        var li = document.createElement("li");
        var p = document.createElement("p");
        ul.appendChild(li);
        li.appendChild(p);
        p.innerHTML = characters[0].name + " has won!";
        break;
    }

    var li = document.createElement("li");
    var name1 = document.createElement("p");
    var text1 = document.createElement("p");
    var name2 = document.createElement("p");
    var text2 = document.createElement("p");
    name1.setAttribute("style", "color:orange;");
    name2.setAttribute("style", "color:orange;");
    ul.appendChild(li);
    li.appendChild(name1);
    li.appendChild(text1);
    li.appendChild(name2);
    li.appendChild(text2);

    var storySeed = random(0, 100);

    //Attack
    if (storySeed <= 5) {
        var seed = random(0, charNum);
        var aggressor = characters[seed];
        var victim = randomchar(aggressor);

        var axeattacks1 = ["hurls " + aggressor.pronoun2 + " axe at", "challenges"];
        var swordattacks1 = ["slices", "challenges"];
        var bowattacks1 = ["pierces", "Ambushes"];

        var axeattacks2 = [" who falls to the floor.", " to a duel! " + aggressor.pronoun1.charAt(0).toUpperCase() + aggressor.pronoun1.slice(1) + " wins and kills " + victim.name + " with " + aggressor.pronoun2 + " axe."];
        var swordattacks2 = [" with " + aggressor.pronoun2 + " sword.", " to a duel! " + aggressor.pronoun1.charAt(0).toUpperCase() + aggressor.pronoun1.slice(1) + " wins and kills " + victim.name + " with " + aggressor.pronoun2 + " sword."];
        var bowattacks2 = [" with an arrow.", " and kills " + victim.name + " with an arrow."];

        if (aggressor.weapon == "Axe") { //Axe attacks
            var attackSeed = random(0, axeattacks1.length - 1);
            var attack1 = axeattacks1[attackSeed];
            var attack2 = axeattacks2[attackSeed];
        }

        else if (aggressor.weapon == "Sword") { //Sword attacks
            var attackSeed = random(0, swordattacks1.length - 1);
            var attack1 = swordattacks1[attackSeed];
            var attack2 = swordattacks2[attackSeed];
        }

        else if (aggressor.weapon == "Bow") { //Bow attacks
            var attackSeed = random(0, bowattacks1.length - 1);
            var attack1 = bowattacks1[attackSeed];
            var attack2 = bowattacks2[attackSeed];
        }

        name1.innerHTML = aggressor.name + " ";
        text1.innerHTML = attack1;
        name2.setAttribute("style", "color:red;");
        name2.innerHTML = " " + victim.name;
        text2.innerHTML = attack2;

        charNum--;
        characters.splice(characters.indexOf(victim), 1);
        deadCharacters.push(victim);
    }

    //Accident
    else if (storySeed <= 8) {
        var seed = random(0, charNum);
        var victim = characters[seed];

        var accidents = ["falls off a cliff.", "tries to climb a tree, but falls off and breaks " + victim.pronoun2 + " neck.", "gets stuck in a lake and drowns.", "gets killed by wild animals.", "succumbs to illness.", "dies from " + victim.pronoun2 + " wounds."];
        var accident = accidents[random(0, accidents.length - 1)];

        name1.setAttribute("style", "color:red;");
        name1.innerHTML = victim.name + " ";
        text1.innerHTML = accident;

        charNum--;
        characters.splice(characters.indexOf(victim), 1);
        deadCharacters.push(victim);
    }

    //Random fact
    else {
        if (random(0, 5) != 5) { //No interaction events
            var seed = random(0, charNum);
            var character = characters[seed];
            console.log(seed, characters)

            var randomfacts = ["sings a song.", "cries.", "tries to make a fire but fails.", "makes a fire.", "sees smoke in the distance.", "takes a nap.",   "climbs up a tree.", "finds a cave.", "collects firewood.", "plans " + character.pronoun2 + " next move.", "explores the area.", "goes fishing but doesn't catch anything.", "catches a fish.", "hides in a bush.", "is hungry.", "looks for fresh water.", "hears footsteps in the distance."];

            var action = randomfacts[random(0, randomfacts.length - 1)];
            name1.innerHTML = character.name + " ";
            text1.innerHTML = action;

        } else { //Interaction events
            var seed = random(0, charNum);
            var character1 = characters[seed];
            var character2 = randomname(character1.name);

            var randomInteractionFacts1 = ["searches for", "thinks about", "challenges", "hears", "dreams about", "sees"];
            var randomInteractionFacts2 = [".", ".", " to a duel, but neither is able to defeat the other.", " talking in the distance.", ".", " far away."];

            var actionseed = random(0, randomInteractionFacts1.length - 1);
            var action1 = randomInteractionFacts1[actionseed];
            var action2 = randomInteractionFacts2[actionseed];

            name1.innerHTML = character1.name + " ";
            text1.innerHTML = action1;
            name2.innerHTML = " " + character2;
            text2.innerHTML = action2;
        }
    }
}

//Show dead and alive characters
var aliveLi = document.createElement("li");
var deadLi = document.createElement("li");
var aliveP = document.createElement("p");
var deadP = document.createElement("p");
ul.appendChild(aliveLi);
ul.appendChild(deadLi);
aliveLi.appendChild(aliveP);
deadLi.appendChild(deadP);
aliveLi.setAttribute("style", "border:3px solid black;background-color:rgba(100, 100, 100, 0.6);");
deadLi.setAttribute("style", "border:3px solid black;background-color:rgba(100, 100, 100, 0.6);");
aliveP.setAttribute("style", "color:lime;");
deadP.setAttribute("style", "color:red;");

var aliveStr = "";
var deadStr = "";
for (var i = 0; i < characters.length; i++) {
    aliveStr += characters[i].name;
    if (i != characters.length - 1) aliveStr += "&emsp;";
}
for (var i = 0; i < deadCharacters.length; i++) {
    deadStr += deadCharacters[i].name;
    if (i != deadCharacters.length - 1) deadStr += "&emsp;";
}

aliveP.innerHTML = aliveStr;
deadP.innerHTML = deadStr;

//Next day
function nextGameDay() {
    localStorage.day = String(day + 1);
    var charNames_ = [];
    var charGenders_ = [];
    var charWeapons_ = [];
    var charIcons_ = [];

    var deadcharNames_ = [];
    var deadcharGenders_ = [];
    var deadcharWeapons_ = [];
    var deadcharIcons_ = [];

    for (var i = 0; i < characters.length; i++) {
        charNames_.push(characters[i].name);
        charGenders_.push(characters[i].gender);
        charWeapons_.push(characters[i].weapon);
        charIcons_.push(characters[i.icons]);
    }

    for (var i = 0; i < deadCharacters.length; i++) {
        deadcharNames_.push(deadCharacters[i].name);
        deadcharGenders_.push(deadCharacters[i].gender);
        deadcharWeapons_.push(deadCharacters[i].weapon);
        deadcharIcons_.push(deadCharacters[i.icons]);
    }

    localStorage.charNames = JSON.stringify(charNames_);
    localStorage.charGenders = JSON.stringify(charGenders_);
    localStorage.charWeapons = JSON.stringify(charWeapons_);
    localStorage.charIcons = JSON.stringify(charIcons_);

    localStorage.deadcharNames = JSON.stringify(deadcharNames_);
    localStorage.deadcharGenders = JSON.stringify(deadcharGenders_);
    localStorage.deadcharWeapons = JSON.stringify(deadcharWeapons_);
    localStorage.deadcharIcons = JSON.stringify(deadcharIcons_);

    window.location.href = "game.html";
}
