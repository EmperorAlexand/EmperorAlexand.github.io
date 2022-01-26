//Click function
var clicks = 0;
var outsideclicks = 0;
function buttonClick() {
  clicks++;
  g("clicks").innerHTML = String(clicks) + " clicks";
  checkClickAchievements();
  if (clicks == 100) {
    createAutoclicker();
  }
}
//Create create autoclicker
function createAutoclicker() {
  var b = document.createElement("button");
  var d = g("div");
  d.appendChild(b);
  b.innerHTML = "Autoclicker";
  b.style = 'background-color: red; font-size: 12px; width: 80px; height: 40px;';
  b.setAttribute("onclick", "toggleAutoclicker()");
  b.setAttribute("class", "button")
  b.setAttribute("id", "autoclicker");
}

//Toggle autoclicker
var autoclicker = false;
function toggleAutoclicker() {
  var b = g("autoclicker");
  autoclicker = !autoclicker;
  if (autoclicker) b.style = 'background-color: lime; font-size: 12px; width: 80px; height: 40px;';
  else b.style = 'background-color: red; font-size: 12px; width: 80px; height: 40px;';
}

//Autoclicker
setInterval(function() {
  if (autoclicker) {
    clicks++;
    g("clicks").innerHTML = String(clicks) + " clicks";
    checkClickAchievements();
  }
}, 200);

//Body click fuction
document.body.addEventListener('click', outsideClick);
function outsideClick(event) {
  if (!event.target.matches(".button")) {
    outsideclicks++;
    if (outsideclicks >= 1) {
      earnAchievement(bodyClick);
    }
  }
}

//Detect right click
g("button").addEventListener('contextmenu', function(ev) {
    ev.preventDefault();
    earnAchievement(rightClick);
    return false;
}, false);

//Get id
function g(id) {
  return document.getElementById(id);
}

//Checks if you have earned any left clicking achievements
function checkClickAchievements() {
  if (clicks >= 1) earnAchievement(clickOnce);
  if (clicks >= 10) earnAchievement(clickTenTimes);
  if (clicks >= 100) earnAchievement(clickHundredTimes);
  if (clicks >= 1000) earnAchievement(clickThousandTimes);
}

//Earn an achievement
function earnAchievement(achievement) {
  earnedAchievements.push(achievements[achievement.index - 1]);
}

//Achievement class
class achievement {
  constructor(name, description, index) {
    this.name = name;
    this.description = description;
    this.index = index;
  }
}

//Achievement objects
const clickOnce = new achievement("Click Beginner", "Click once", 1);
const clickTenTimes = new achievement("Click Novice", "Click 10 times", 2);
const clickHundredTimes = new achievement("Click Challenger", "Click a hundred times", 3);
const clickThousandTimes = new achievement("Click Master", "Click a thousand times", 4);
const rightClick = new achievement("Creative Clicker", "Right click the button", 5);
const bodyClick = new achievement("Bad Aim", "Click outside the button", 6);

//Achievement arrays
var achievements = [clickOnce, clickTenTimes, clickHundredTimes, clickThousandTimes, rightClick, bodyClick];
var earnedAchievements = [];

//Name and color achievement table cells red
for (var i = 0; i < achievements.length; i++) {
  var tinytext = document.createElement("p");
  var a = g(String(achievements[i].index));
  tinytext.innerHTML = "???";
  tinytext.style = "color: red;";
  tinytext.setAttribute("id", "t" + String(i + 1));
  a.parentElement.appendChild(tinytext);
  a.innerHTML = achievements[i].name;
  a.style = "color:red;";
}

//Color earned achievements green and and alittle checkmark
setInterval(function() {
  for (var i = 0; i < earnedAchievements.length; i++) {
    var a = g(String(earnedAchievements[i].index));
    var t = g("t" + String(earnedAchievements[i].index));
    a.style = "color:lightgreen;";
    t.style = "color:lightgreen; font-size: 10px;";
    a.innerHTML = earnedAchievements[i].name + " ✔️";
    t.innerHTML = earnedAchievements[i].description;
  }
}, 100);
