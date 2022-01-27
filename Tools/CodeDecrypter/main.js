//Get function
function g(id) {return document.getElementById(id);}

//Only contains function
function onlycontains(str, substr) {
  var r;
  for (var i = 0; i < str.length; i++) {
    r = false;
    for (var j = 0; j < substr.length; j++) {
      if (str[i] == substr[j]) {
        r = true;
        break;
      }
    }
    if (!r) return 0;
  }
  return 1;
}

//Base class
class base {
  constructor(radix, chars, name, mixedcases) {
    this.radix = radix;
    this.chars = chars;
    this.name = name;
    this.mixedcases = mixedcases;
  }
  toDecimal(input) {
    return convertBase(this, input);
  }
}

//Find base
function f(input) {
  for (var i = 0; i < bases.length; i++) {
    if (bases[i].name == input) return i;
  }
}

//Bases
var bases = [
  new base(2, "01", "Binary", 0),
  new base(3, "012", "Ternary", 0),
  new base(4, "0123", "Quaternary", 0),
  new base(5, "01234", "Quinary", 0),
  new base(6, "012345", "Senary", 0),
  new base(7, "0123456", "Septenary", 0),
  new base(8, "01234567", "Octal", 0),
  new base(9, "012345678", "Nonary", 0),
  new base(10, "0123456789", "Decimal", 0),
  new base(11, "0123456789A", "Undecimal", 0),
  new base(12, "0123456789AB", "Duodecimal", 0),
  new base(13, "0123456789ABC", "Tridecimal", 0),
  new base(14, "0123456789ABCD", "Tetradecimal", 0),
  new base(15, "0123456789ABCDE", "Pentadecimal", 0),
  new base(16, "0123456789ABCDEF", "Hexadecimal", 0),
  new base(17, "0123456789ABCDEFG", "Heptadecimal", 0),
  new base(18, "0123456789ABCDEFGH", "Octodecimal", 0),
  new base(19, "0123456789ABCDEFGHI", "Enneadecimal", 0),
  new base(20, "0123456789ABCDEFGHIJ", "Vigesimal", 0),
  new base(32, "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", "Duotrigesimal", 0),
  new base(48, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKL", "Octoquadragesimal", 1),
  new base(64, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", "Tetrasexagesimal", 1)
];

//Ai decryption
function decryptCode() {
  var input = String(g("code-input").value);
  var output = g("decrypted-code");

  output.innerHTML = "";

  //Output bases
  for (var i = 0; i < bases.length; i++) {
    if (bases[i].toDecimal(input)) {
      var decodedstring = (decryptionOutput ? decryptDecimal(bases[i].toDecimal(input)) : bases[i].toDecimal(input));
      output.innerHTML += "<h5>" + bases[i].name + " (Base " + String(bases[i].radix) + "):</h5><br>" + decodedstring + "<br>";
    }
  }

  //Output morse
  if (decodeMorse(input)) output.innerHTML += "<h5>Morse code:</h5><br>" + decodeMorse(input) + "<br>";

  //Possible encryptions
  if (output.innerHTML != "") {
    output.innerHTML = "<h4>Possible encryptions:</h4>" + output.innerHTML;
    return;
  }
  output.innerHTML = "<h6>No encryption detected.<h6>";
}

//Toggle decryption output
var decryptionOutput = 1;
function toggleDecryptionOutput() {
  decryptionOutput = !decryptionOutput;
  g("decryptionoutputtype").innerHTML = "Current output type: " + (decryptionOutput ? "Text" : "Numbers");
}

//Reset decryption
function resetDecryption() {
  var input = g("code-input");
  var output = g("decrypted-code");

  input.value = "";
  output.innerHTML = "";
}

//Create encryption option
function createEncryptionOption(value, name) {
  var s = g("encryption");
  var o = document.createElement("option");
  s.appendChild(o);
  o.value = value;
  o.innerHTML = name;
}

//Create encryption option html elements
for (var i = 0; i < bases.length; i++) createEncryptionOption(i, bases[i].name);
createEncryptionOption(bases.length, "Morse code")

//Chosen encryption
function encryptText() {
  var encryption = g("encryption").value;
  var input = g("text-input").value;
  var output = g("text-output");
  var b = bases.length;

  if (encryption < b) {
    input = convertBase(bases[0], unicodeToBinary(input));
    output.innerHTML = encryptBase(input, bases[encryption]);
  }
  if (encryption == b) output.innerHTML = encodeMorse(input);
  g("code-input").value = output.innerHTML;
}

//Reset encryption
function resetEncryption() {
  var encryption = g("encryption");
  var input = g("text-input");
  var output = g("text-output");

  encryption.value = "";
  input.value = "";
  output.innerHTML = "";
}

//Covert any base to decimal
function convertBase(baseobj, n) {

  //Variables
  var base = baseobj.radix;
  var characters = baseobj.chars;

  //Check if string is proper and turn into array
  if (baseobj.mixedcases) {
    if (!onlycontains(n, characters + " ")) return 0;
    n = n.split(" ");
  }
  else {
    if (!onlycontains(n.toUpperCase(), characters + " ")) return 0;
    n = n.toUpperCase().split(" ");
  }
  var output = "";

  //Correct character
  for (var i = 0; i < n.length; i++) {
    var sum = 0;
    for (var j = 0; j < n[i].length; j++) {
      var int = 0;
      for (var k = 0; k < characters.length; k++) {
        if (n[i][j] == characters[k]) {
          int = k;
          break;
        }
      }
      sum += (base ** ((n[i].length - j) - 1)) * int;
    }
    //Add sum of byte to output string
    output += String(sum);
    if (i != (n.length - 1)) output += " ";
  }
  //Return output string
  return output;
}

//Decrypt decimal
function decryptDecimal(input) {

  if (input == 0) return 0;

  //Check if string only contains decimal
  if (!onlycontains(input, "0123456789 ")) return 0;
  input = String(input);
  input = input.split(" ");

  //Create ascii string
  var ascii = [];
  for (var i = 0; i < input.length; i++) {
    ascii[i] = String.fromCharCode(input[i]);
  }

  //Return ascii string
  return ascii.join("");
}

//Turn text to binary code
function unicodeToBinary(input) {
  return input.split('').map(function (char) {
      return char.charCodeAt(0).toString(2);
  }).join(' ');
}

//Encrypt any base
function encryptBase(numbers, baseobj) {
  var radix = baseobj.radix;
  var keys = baseobj.chars.split("");

  numbers = numbers.split(" ");
  var fulloutput = "";
  for (var i = 0; i < numbers.length; i++) {
    var num = parseInt(numbers[i]);
    if (num < 0) var isNegative = true;
    if (isNaN(num = Math.abs(+num))) return NaN;

    let output = [];
    do {
      let index = num % radix;
      output.unshift(keys[index]);
      num = Math.trunc(num / radix);
    } while (num != 0);
    if (isNegative) output.unshift('-');
    fulloutput += output.join("") + ' ';
  }
  return fulloutput;
}

//Encode morse code
function encodeMorse(text) {
  var morsecharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
  var encodedletters = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--..", "-----", ".----", "..---", "...--", "....-", ".....", "-....", "--...", "---..", "-----.", ""];
  var output = "";

  text = text.toUpperCase();
  if (!onlycontains(text, morsecharacters)) return 0;
  for (var i = 0; i < text.length; i++) {
    for (var j = 0; j < morsecharacters.length; j++) {
      if (text[i] == morsecharacters[j]) output += encodedletters[j] + "   ";
    }
  }
  return output;
}

//Decode morse code
function decodeMorse(morsecode) {
  var morsecharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
  var encodedletters = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--..", "-----", ".----", "..---", "...--", "....-", ".....", "-....", "--...", "---..", "-----.", ""];
  var output = "";

  if (!onlycontains(morsecode, ".- ")) return 0;
  morsecode = morsecode.split(/\s+/);
  for (var i = 0; i < morsecode.length; i++) {
    for (var j = 0; j < encodedletters.length; j++) {
      if (morsecode[i] == encodedletters[j]) output += morsecharacters[j];
    }
  }
  return output;
}

//Encode vigenére
function encodeVigenere(input) {

}

//Decode vigenére
function decodeVigenere(input) {

}

//Decode swedish ceasar cipher
function decryptCeasar() {
  input = g("ceasar-input").value.toUpperCase();
  output = g("decrypted-ceasar");
  var string = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
  if (onlycontains(input, "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ ")) {
    for (var i = 1; i < 10; i++) {
      var currentplus = "";
      var currentminus = "";
      for (var j = 0; j < input.length; j++) {
        var index = 0;
        for (var k = 0; k < characters.length; k++) {
            if (input[j] == characters[k]) {
              index = k;
              break;
            }
        }
        if (input[j] != " ") {
          currentplus += characters[(k + i) % 29];
          if ((k - i) < 0) {
            currentminus += characters[29 + (k - i)];
          } else {
            currentminus += characters[k - i];
          }
        } else {
          currentplus += " ";
          currentminus += " ";
        }
      }
      currentplus += "<br><br>";
      currentminus += "<br><br>";
      string += currentplus;
      string += currentminus;
    }
    output.innerHTML = string;
  } else return 0;
}

//Reset ceasar output
function resetCeasar() {
  g("decrypted-ceasar").innerHTML = "";
}
