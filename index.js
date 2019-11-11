const _ = require("lodash");
const card = require("./card.js");
const deck = require("./deck.js");
const player = require("./player.js");

// functions i might need //
function arrayRemove(arr, value) {

    return arr.filter(function(ele){
        return ele != value;
    });
 
 }
///////////////////////////

let deck_A = deck.Deck();

console.log("Creating Deck...\n");
console.log("non-shuffled:\n");
console.log(deck_A);

let shuffled_deck_A = deck.Suffle(deck_A);
console.log("Shuffled = \n",shuffled_deck_A);

console.log("Creating Players\n");
// create a function for registering players
let playersArray = [];
function registerPlayers(name, balance){
    let _player = player.Player(name, balance, []);
    playersArray.push(_player);
    return _player;
}
function unRegisterPlayer(player){
    arrayRemove(playersArray, player);
}

let player_1 = registerPlayers("player 1", 100);
let player_2 = registerPlayers("player 2", 100);
console.log("players are %s \n", JSON.stringify(playersArray));

// testing remove
unRegisterPlayer(player_1);
console.log("players are %s \n", JSON.stringify(playersArray));
