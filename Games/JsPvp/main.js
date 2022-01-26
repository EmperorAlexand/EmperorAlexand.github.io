//Metadata
const NAME = "Js Pvp";
const VERSION = 0.1;

//Convenience
function g(id) {return document.getElementById(id);}
function r(n) {return Math.floor(Math.random() * n);}
function s(n) {return String(n);}

//Player class
class Player {

  //Constructor
  constructor(name) {

    //Statistics
    this.atk = 4;
    this.dfn = 2;
    this.spd = 5;
    this.level = 1;
    this.exp = 0;
    this.hp = 100;
    this.maxhp = 100;
    this.name = name;
    this.gold = 0;

    //Ladder points
    this.rating = 0;

    //Gear
    this.weapon = weapons.Stick;
    this.armor = armors.Clothing;

    //Shards
    this.shards = [0, 0];

    //Set name
    var nameDisplay = g('name');
    nameDisplay.setAttribute('value', this.name);

  }

}

//Weapon class
class Weapon {

  //Constructor
  constructor(name, atk, effect) {

    //Variables
    this.name = name;
    this.atk = atk;
    this.effect = effect;

  }

}

//Armor class
class Armor {

  //Constructor
  constructor(name, dfn, effect) {

    //Variables
    this.name = name;
    this.dfn = dfn;
    this.effect = effect;

  }

}

//Shard class
class Shard {

  //Constructor
  constructor(name, index) {
    this.name = name;
    this.img = 'Images/Items/' + name.replace(/\s/g, '') + '.png';
    this.index = index;
  }

}

//Enemy class
class Enemy {

  //Constructor
  constructor(name, atk, dfn, spd, maxhp, exp, loot) {

    //Variables
    this.name = name;
    this.atk = atk;
    this.dfn = dfn;
    this.spd = spd;
    this.maxhp = maxhp;
    this.hp = maxhp;
    this.img = 'Images/Enemies/' + name + '.png';

    //Loot
    this.loot = loot;
    this.exp = exp;

  }

}

//Effect array
var effects = {
  None : 0,
  FireAttacks : 1,
  IceAttacks : 2
}

//Weapon array
var weapons = {
  Stick : new Weapon("Stick", 1, 0),
  WoodenSword : new Weapon("Wooden Sword", 3, 0),
  StoneSword : new Weapon("Stone Sword", 5, 0),
  Flameblade : new Weapon("Flameblade", 5, effects.FireAttacks),
  Frostblade : new Weapon("Frostblade", 5, effects.IceAttacks)
};

//Armor array
var armors = {
  Clothing : new Armor("Clothing", 1, 0),
  LeatherArmor : new Armor("Leather Armor", 2, 0)
};

//Shard array
var shards = {
  FireShard : new Shard("Fire Shard", 0),
  IceShard : new Shard("Ice Shard", 1),
  JungleShard : new Shard("Jungle Shard", 2)
};

//Global clock
var deathclock = 0;

//Update bars
var hplevel = 0;
var explevel = 0;
var enemyhplevel = 0;
function updateBars() {

  //Get bars
  var hpDisplay = g('healthbar');
  var expDisplay = g('expbar');

  //Speed
  var spd = 25;

  //Update healthbar
  hplevel += ((User.hp - hplevel) / spd);
  hpDisplay.setAttribute('value', hplevel);
  hpDisplay.setAttribute('max', User.maxhp);

  /*
  //Hp bar color
  var redcol = (100 - User.hp) * 2.55;
  var greencol = User.hp * 2.55;
  hpDisplay.style.background = 'red';
  */

  //Update expbar
  explevel += ((User.exp - explevel) / spd);
  expDisplay.setAttribute('value', explevel);
  expDisplay.setAttribute('max', User.level * 10);

  //Enemy healthbar
  if (fighting) {
    var enemyhealthbar = g('enemyhealthbar');
    enemyhplevel += ((globalenemy.hp - enemyhplevel) / (spd / 5));
    enemyhealthbar.setAttribute('value', enemyhplevel);
  }

}

//Update player profile
function updateProfile() {

  //Get name
  var name = g('name');

  //Get stat elements
  var attackDisplay = g('atk');
  var defenseDisplay = g('dfn');
  var speedDisplay = g('spd');
  var levelDisplay = g('level');
  var expsubtitle = g('expsubtitle');
  var hpsubtitle = g('hpsubtitle');

  //Get gear elements
  var weaponImg = g('weaponimage');
  var armorImg = g('armorimage');
  var weaponNameDisplay = g('weaponname');
  var armorNameDisplay = g('armorname');

  //Update name
  name.setAttribute('value', User.name);

  //Update stats
  attackDisplay.innerHTML = s(User.atk + User.weapon.atk) + ' Atk';
  defenseDisplay.innerHTML = s(User.dfn + User.armor.dfn) + ' Dfn';
  speedDisplay.innerHTML = s(User.spd) + ' Spd';
  levelDisplay.innerHTML = 'Level ' + s(User.level);
  expsubtitle.innerHTML = 'EXP (' + s(User.exp) + ' / ' + s(User.level * 10) + ')';
  hpsubtitle.innerHTML = 'HP (' + s(User.hp) + ' / ' + s(User.maxhp) + ')';

  //Update bars
  updateBars();

  //Update gear
  weaponImg.setAttribute('src', 'Images/Gear/' + User.weapon.name + '.png');
  armorImg.setAttribute('src', 'Images/Gear/' + User.armor.name + '.png');
  weaponNameDisplay.innerHTML = User.weapon.name + '<br><h6>(+' + s(User.weapon.atk) + ' Atk)</h6>';
  armorNameDisplay.innerHTML = User.armor.name + '<br><h6>(+' + s(User.armor.dfn) + ' Dfn)</h6>';

  //Update shards
  updateShards();

  //Update title
  document.title = User.name + ' (' + s(User.hp) + ' / ' + s(User.maxhp) + ')';

}

//Update shard inventory
function updateShards() {

  //Shardz (this is dumb)
  var shardz = [
    shards.FireShard,
    shards.IceShard,
    shards.JungleShard
  ]

  //Loop through items
  for (var i = 0; i < User.shards.length; i++) {
    var editedname = shardz[i].name.toLowerCase().replace(/\s/g, '');
    var amountdisplay = g(editedname + 'amount');
    amountdisplay.innerHTML = User.shards[i];

    //Update icon
    if (User.shards[i] > 0) {
      g(editedname + 'img').setAttribute('src', shardz[i].img);
    }

  }

}

//User level up
function levelUp() {

  //Message
  createPopup('Level Up! ', s(User.level) + ' -> ' + s(User.level + 1), 'Images/Icons/levelup-icon.png');

  //Update values
  User.exp -= User.level * 10;
  User.level++;

  //Level up rewards
  var reward = null;
  switch (User.level) {

    //Level 2
    case 2:
    reward = weapons.WoodenSword;
    User.weapon = reward;
    break;

    //Level 3
    case 3:
    reward = armors.LeatherArmor;
    User.armor = reward;
    break;

    //Level 5
    case 5:
    reward = weapons.StoneSword;
    User.weapon = reward;
    break;

  }

  //Reward message
  if (reward != null)
    createPopup('You got ' + reward.name + '!', 'Added to your inventory.', 'Images/Gear/' + reward.name + '.png');

  //Check if still level up
  if (User.exp >= (User.level * 10)) {
    levelUp();
  }
}

//Save function
function save() {

  //Last minute name change
  User.name = g('name').value;

  //Save user
  localStorage.User = btoa(JSON.stringify(User));

  //Save death clock
  localStorage.deathclock = deathclock;

}

//Load function
function load() {

  //Load user
  User = JSON.parse(atob(localStorage.User));

}

//Reset function
function reset() {

  //Reset user
  User = new Player("Steve");

}

//Export save function
function exportSave() {

  //Copy text
  var copyText = btoa(JSON.stringify(User));
  navigator.clipboard.writeText(copyText);

  //Alert
  alert('Character copied to clipboard!');

}

//Import save function
function importSave() {

  //Get & parse user data
  var data = prompt('Please paste your save file.', '');
  User = JSON.parse(atob(data));

}

//Start fight
var fighting = false;
var globalenemy = null;
function startFight() {

  //Check if already fighting
  if (fighting) return;
  else fighting = true;

  //Get enemy
  var enemy = generateEnemy();
  globalenemy = enemy;

  //Announce encounter
  createPopup('You encountered a ' + enemy.name + '!', 'Now fight!', enemy.img);

  //Get and create elements
  g('top').innerHTML = `
    <div id="enemydiv">
      <h3 id="enemyname"></h3>
      <img id="enemyimage" src="" width="128"><br>
      <progress id="enemyhealthbar"></progress>
      <h6 id="enemyhealthdisplay"><h6>
      <p id="enemyatk"></p>
      <img src="Images/Icons/attack-icon.png">
      <p id="enemydfn"></p>
      <img src="Images/Icons/defense-icon.png">
      <p id="enemyspd"></p>
      <img src="Images/Icons/speed-icon.png"><br>
      <button id="attackbutton" class="actionbutton attackbutton">Attack</button>
      <button id="defendbutton" class="actionbutton defendbutton">Defend</button>
      <button id="escapebutton" class="actionbutton escapebutton">Escape</button>
    </div>
  `;

  //Set stat values
  g('enemyname').innerHTML = enemy.name;
  g('enemyatk').innerHTML = s(enemy.atk) + ' Atk';
  g('enemydfn').innerHTML = s(enemy.dfn) + ' Dfn';
  g('enemyspd').innerHTML = s(enemy.spd) + ' Spd';
  g('enemyhealthdisplay').innerHTML = 'HP (' + s(enemy.hp) + ' / ' + s(enemy.maxhp) + ')';
  g('enemyimage').setAttribute('src', 'Images/Enemies/' + enemy.name + '.png');

  //Healthbar
  g('enemyhealthbar').setAttribute('max', s(enemy.maxhp));
  g('enemyhealthbar').setAttribute('value', s(enemy.hp));

  //Set button functions
  g('attackbutton').onclick = function() {attack(enemy);};
  g('defendbutton').onclick = function() {defend(enemy);};
  g('escapebutton').onclick = function() {escapeEnemy(enemy);};

}

//End fight; destroy enemy
function endFight(enemy, method) {

  //Remove enemy block
  var block = g('top');
  while (block.firstChild) {
    block.removeChild(block.firstChild);
  }

  //Message
  if (method) { //If defeated violently
    createPopup('You defeated the ' + enemy.name + '!', '+' + s(enemy.exp) + ' EXP!', enemy.img);

    //Exp animation
    var expdisplay = g('expsubtitle');
    var expbar = g('expbar');
    expdisplay.classList.remove('expanimation');
    expdisplay.offsetWidth;
    expdisplay.classList.add('expanimation');
    expbar.classList.remove('expbaranimation');
    expbar.offsetWidth;
    expbar.classList.add('expbaranimation');

    //Add exp
    User.exp += enemy.exp;
    if (User.exp >= (User.level * 10)) {
      levelUp();
    }

    //Loot
    for (var i = 0; i < enemy.loot.length; i++) {
      addShard(enemy.loot[i].index);
    }

  }

  //End fight
  fighting = false;

  //Undefend
  defending = false;

  //Global enemy
  globalenemy = null;

}

//Generate enemy
function generateEnemy() {

  //name, atk, dfn, spd, maxhp, exp

  //Enemies for each level
  var enemies = [

    //Level 1
    [
      new Enemy("Wolf", 3, 1, 3, 15, 2, []),
      new Enemy("Zombie", 4, 2, 2, 20, 3, [])
    ],

    //Level 2
    [
      new Enemy("Wolf", 4, 1, 5, 20, 3, []),
      new Enemy("Zombie", 5, 3, 3, 25, 4, [])
    ],

    //Level 3
    [
      new Enemy("Wolf", 4, 2, 6, 24, 4, []),
      new Enemy("Zombie", 6, 3, 3, 30, 6, []),
      new Enemy("Skeleton", 7, 2, 3, 26, 5, [])
    ],

    //Level 4
    [
      new Enemy("Zombie", 8, 3, 6, 30, 7, []),
      new Enemy("Skeleton", 9, 3, 7, 30, 8, []),
      new Enemy("Frostling", 5, 5, 2, 40, 7, [shards.IceShard])
    ],

    //Level 5
    [
      new Enemy("Skeleton", 8, 4, 8, 30, 8, []),
      new Enemy("Flameling", 5, 6, 2, 40, 8, [shards.FireShard])
    ],

    //Level 6
    [
      new Enemy("Frostling", 5, 7, 3, 45, 9, [shards.IceShard]),
      new Enemy("Flameling", 10, 2, 5, 25, 11, [shards.FireShard])
    ],

    //Level 7
    [
      new Enemy("Frostling", 6, 7, 4, 45, 9, [shards.IceShard]),
      new Enemy("Flameling", 10, 3, 6, 25, 11, [shards.FireShard])
    ],

    //Level 8
    [
      new Enemy("Frostling", 6, 8, 4, 50, 10, [shards.IceShard]),
      new Enemy("Flameling", 11, 3, 7, 25, 12, [shards.FireShard])
    ],

    //Level 9
    [
      new Enemy("Frostling", 6, 9, 4, 50, 10, [shards.IceShard]),
      new Enemy("Flameling", 11, 3, 9, 30, 12, [shards.FireShard]),
      new Enemy("Wildling", 5, 5, 15, 35, 13, [shards.JungleShard])
    ]

  ];

  //Midgame
  if (User.level <= enemies.length) {
    return enemies[User.level - 1][r(enemies[User.level - 1].length)];
  }

  //Endgame
  return new Enemy("Titan", 100, 100, 100, 1000, 1000);

}

//Attack enemy
function attack(enemy, user) {

  //Critical hits
  var rnd = Math.random();
  var crit = 0;
  var extremecrit = 0;
  if (rnd < 0.01) extremecrit = 1;
  else if (rnd < 0.15) crit = 1;

  //Damage
  var dmg = Math.max(((User.atk + User.weapon.atk) - enemy.dfn), 1) * (crit ? 2 : 1) * (extremecrit ? 4 : 1);
  enemy.hp -= dmg;

  //Update healthbar
  var enemyHp = g('enemyhealthdisplay');
  enemyHp.innerHTML = 'HP (' + s(enemy.hp) + ' / ' + s(enemy.maxhp) + ')';

  //Alert
  if (extremecrit) {createPopup('You attacked!', 'Extreme critical hit! You dealt ' + s(dmg) + ' DMG!', 'Images/Icons/attack-icon.png');}
  else if (crit) {createPopup('You attacked!', 'Critical hit! You dealt ' + s(dmg) + ' DMG!', 'Images/Icons/attack-icon.png');}
  else {createPopup('You attacked!', 'You dealt ' + s(dmg) + ' DMG!', 'Images/Icons/attack-icon.png');}

  //Defeat enemy
  if (enemy.hp <= 0) {
    endFight(enemy, 1);
    return;
  }

  //Enemy turn
  enemyTurn(enemy);

}

//Defend from enemy
defending = false;
function defend(enemy) {

  //Heal
  //var heal = Math.ceil((User.dfn + User.armor.dfn) / 2);
  //User.hp = Math.min(User.hp + heal, User.maxhp);
  defending = true;

  //Popup disabled to prevent popup clutter
  //createPopup('You entered defense mode!', '+' + s(heal) + ' hp!', 'Images/Icons/defense-icon.png');

  //Enemy turn
  enemyTurn(enemy);

}

//Escape from enemy
function escapeEnemy(enemy) {

  //Escape if greater speed
  if (User.spd >= enemy.spd) {
    createPopup('You escaped!', 'You escaped from the ' + enemy.name + '!', 'Images/Icons/speed-icon.png');
    endFight(enemy, 0);
  }

  //Fail to escape
  else {
    createPopup('You failed to escape!', 'The fight continues!', 'Images/Icons/fail-icon.png');

    //Enemy turn
    enemyTurn(enemy);
  }
}

//Enemy turn
function enemyTurn(enemy) {

  //Block
  if (defending && Math.random() < 0.5) {
    var dmg = User.dfn;
    var title = 'You blocked the ' + enemy.name + '\'s attack!';
    createPopup(title, 'The ' + enemy.name + ' hurt itself! ' + s(dmg) + ' DMG!', 'Images/Icons/defense-icon.png');
    enemy.hp -= dmg;
    var enemyHp = g('enemyhealthdisplay');
    enemyHp.innerHTML = 'HP (' + s(enemy.hp) + ' / ' + s(enemy.maxhp) + ')';

    //Defeat enemy
    if (enemy.hp <= 0) {
      endFight(enemy, 1);
      return;
    }

  }

  //Attack
  else {

    //Critical hits
    var crit = (Math.random() < 0.1);

    //Damage
    var dmg = Math.max((enemy.atk - (User.dfn + User.armor.dfn)), 1) * (crit + 1);
    User.hp -= dmg;

    //Normal attack
    if (!defending) {
      var attackTitle = 'The ' + enemy.name + ' attacked!';
      var attackText = (crit ? 'Critical hit! ' : '') + 'It dealt ' + s(dmg) + ' DMG to you!';
    }

    //Failed defense
    else {
      var attackTitle = 'You  failed to defend!';
      var attackText = (crit ? 'Critical hit! ' : '') + 'The ' + enemy.name + ' dealt ' + s(dmg) + ' DMG to you!';
    }

    //Attack popup
    var img = g('popupimage' + s(popupscreated - 1));
    if (img.src == 'file:///C:/Users/Manga/OneDrive/Desktop/Code/Alexand.org/Games/JsPvp/Images/Icons/attack-icon.png') {

      //If countering, edit previous popup to prevent clutter
      g('popup' + s(popupscreated - 1)).innerHTML += '<p style="font-size:10px;">The ' + enemy.name + ' countered! ' + s(dmg) + ' DMG!';
      g('popupimage' + s(popupscreated - 1)).setAttribute('src', 'Images/Icons/fight-icon.png');
      img.style += 'display:inline-block;float:left;margin-top:5px;';

    } else {
      createPopup(attackTitle, attackText, 'Images/Icons/enemyattack-icon.png');
    }
  }

  //Undefend
  defending = false;

  //Player death
  if (User.hp <= 0) {
    deathclock = 10;
    save();
    window.location.href = 'death.html';
  }

}

//Create popup function
var popupscreated = 0;
var popups = [];
function createPopup(title, msg, icon) {

  //Get list
  var list = g('popups');

  //Create popup
  var popup = document.createElement('li');
  list.appendChild(popup);

  //Edit attributes
  popup.innerHTML = '<img style="float:left;width:32px;" src="' + icon + '" id="popupimage' + s(popupscreated) + '"><h5>' + title + '</h6><p style="font-size:10px;">' + msg + '</p>';
  popup.setAttribute('id', 'popup' + s(popupscreated));
  popups.push(popupscreated);
  popupscreated++;

  //Prohibit overflow
  if (popups.length > 1000) {
    destroyPopup(popups[0]);
  }

}

//Destroy popup function
function destroyPopup(id) {

  //Destroy
  var popup = g('popup' + s(id));
  popup.remove();
  popups.splice(popups.indexOf(id), 1);

}

//Add shard to inevntory
function addShard(shard) {

  //Add shard
  User.shards[shard]++;

}

//Start PVP
function startPvp() {
  window.location.href = "pvp.html";
}

//Create User
var User = new Player("Steve");

//Autoload
//load();

//Check if dead
if (localStorage.deathclock > 0) {
  window.location.href = 'death.html';
}

//Update profile
setInterval(function() {
  updateProfile(User);
}, 100);

//Update bars
setInterval(function() {
  updateBars();
}, 10);

//Healing
setInterval(function() {
  if (User.hp < User.maxhp && !fighting) {
    User.hp++;
  }
}, 1000);

//Scroll down popups
setInterval(function() {
  var popups = document.getElementById('popups');
  popups.scrollTop += (popups.scrollHeight - popups.scrollTop - 160) / 50;
}, 5);

//Set all item amounts to 0
for (var i = 0; i < User.shards.length; i++) {
  User.shards[i] = 0;
}
