//Convenience
function g(id) {return document.getElementById(id);}

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

//Get players
var Player1 = JSON.parse(atob(prompt('Please paste player 1 save data.', '')));
var Player2 = JSON.parse(atob(prompt('Please paste player 2 save data.', '')));

//Update profiles
function updateProfiles() {

  //Names
  g('p1name').innerHTML = Player1.name;
  g('p2name').innerHTML = Player2.name;

  //Levels
  g('p1level').innerHTML = 'Level ' + String(Player1.level);
  g('p2level').innerHTML = 'Level ' + String(Player2.level);

  //Exp
  g('p1expbar').setAttribute('max', Player1.level * 10);
  g('p1expbar').setAttribute('value', Player1.exp);
  g('p2expbar').setAttribute('max', Player2.level * 10);
  g('p2expbar').setAttribute('value', Player2.exp);
  g('p1expsubtitle').innerHTML = 'Exp (' + String(Player1.exp) + ' / ' + String(Player1.level * 10) + ')';
  g('p2expsubtitle').innerHTML = 'Exp (' + String(Player2.exp) + ' / ' + String(Player2.level * 10) + ')';

  //Hp
  g('p1hpbar').setAttribute('max', Player1.maxhp);
  g('p1hpbar').setAttribute('value', Player1.hp);
  g('p2hpbar').setAttribute('max', Player2.maxhp);
  g('p2hpbar').setAttribute('value', Player2.hp);
  g('p1hpsubtitle').innerHTML = 'Hp (' + String(Player1.hp) + ' / ' + String(Player1.maxhp) + ')';
  g('p2hpsubtitle').innerHTML = 'Hp (' + String(Player2.hp) + ' / ' + String(Player2.maxhp) + ')';

  //Stats
  g('p1atk').innerHTML = Player1.atk + ' Atk';
  g('p1dfn').innerHTML = Player1.dfn + ' Dfn';
  g('p1spd').innerHTML = Player1.spd + ' Spd';
  g('p2atk').innerHTML = Player2.atk + ' Atk';
  g('p2dfn').innerHTML = Player2.dfn + ' Dfn';
  g('p2spd').innerHTML = Player2.spd + ' Spd';

  //Gear
  g('p1weaponimage').setAttribute('src', 'Images/Gear/' + Player1.weapon.name + '.png');
  g('p1armorimage').setAttribute('src', 'Images/Gear/' + Player1.armor.name + '.png');
  g('p2weaponimage').setAttribute('src', 'Images/Gear/' + Player2.weapon.name + '.png');
  g('p2armorimage').setAttribute('src', 'Images/Gear/' + Player2.armor.name + '.png');
  g('p1weaponname').innerHTML = Player1.weapon.name;
  g('p1armorname').innerHTML = Player1.armor.name;
  g('p2weaponname').innerHTML = Player2.weapon.name;
  g('p2armorname').innerHTML = Player2.armor.name;

  //Rating
  g('p1rating').innerHTML = Player1.name + ' (' + String(Player1.rating) + ')';
  g('p2rating').innerHTML = Player2.name + ' (' + String(Player2.rating) + ')';

}

//Set regular update
setInterval(function(){
  updateProfiles();
}, 100);
