const _ = require("lodash");
const card = require("./mods/card.js");
const deck = require("./mods/deck.js");
const player = require("./mods/player.js");
const category = require("./mods/category.js")

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
// console.log(deck_A);

let shuffled_deck_A = deck.Suffle(deck_A);
// console.log("Shuffled = \n",shuffled_deck_A);

console.log("Creating Players\n");
// create a function for registering players
let playersArray = [];
function registerPlayers(name, balance){
    let _player = player.Player(name, balance);
    playersArray.push(_player);
    return _player;
}
function unRegisterPlayer(player){
    let indx = playersArray.indexOf(player);
    playersArray = playersArray.splice(indx, indx+1);
}

let player_1 = registerPlayers("player 1", 100);
let player_2 = registerPlayers("player 2", 100);
let player_3 = registerPlayers("player 3", 100);
let player_4 = registerPlayers("player 4", 100);
// console.log("players are %s \n", JSON.stringify(playersArray));

// // testing remove
// unRegisterPlayer(player_1);
// console.log("testing remove - players are %s \n", JSON.stringify(playersArray));

// distribute cards among players
function distributeCards() {
    playersArray.forEach( (player, indx, players) => {
        player.hand.push(shuffled_deck_A[0])
        shuffled_deck_A.shift();
        player.hand.push(shuffled_deck_A[0])
        shuffled_deck_A.shift();
    });
}

distributeCards();
// console.log("players hands %s \n", JSON.stringify(playersArray));

// console.log("remaining Cards in Deck \n");
// console.log("Shuffled = \n",shuffled_deck_A);


// creating the rounds 
// preflop , flop, turn & river

console.log("Starting preflop round ...\n");

// const numberOfRounds = 3; // ToDo: later
let tableCardArray = [];
function distributeOneCardTotable() {
    tableCardArray.push(shuffled_deck_A[0])
        shuffled_deck_A.shift();
}
function DistributeToTable(roundNumber) {
    if (roundNumber < 1) {
        for (let index = 0; index < 3; index++) {
            distributeOneCardTotable();
        }
    } else {
        distributeOneCardTotable();
    }
}

DistributeToTable(0);

console.log("Cards on table = \n", tableCardArray);
// console.log("remaining Cards in Deck \n");
// console.log("Shuffled = \n",shuffled_deck_A);

// testing category
// console.log("category variable = ", category.Category);
// console.log("player hand category = ", player_1.category);
console.log("category calc = ", category.CalculateCategory(player_1, tableCardArray));
console.log("player 1 hand category = ",player_1.hand, "\n", player_1.category);
console.log("category calc = ", category.CalculateCategory(player_2, tableCardArray));
console.log("player 2 hand category = ",player_2.hand, "\n", player_2.category);
console.log("category calc = ", category.CalculateCategory(player_3, tableCardArray));
console.log("player 3 hand category = ",player_3.hand, "\n", player_3.category);
//////////////////////////////////////// for testing
let tableCardArray2 = [
    { value: 7, name: '7', suit: 'Club' }  ,
    { value: 7, name: '7', suit: 'Spades' } ,
    { value: 5, name: '5', suit: 'Clubs' } ,
    { value: 4, name: '4', suit: 'Diamonds' } ,
    { value: 10, name: '10', suit: 'Diamonds' }  
    
]
////////////////////////////////////////
player_4.hand = [
    { value: 7, name: '7', suit: 'Hearts' } ,
    { value: 5, name: '5', suit: 'Spades' } 
];
console.log("category 4 = ", category.CalculateCategory(player_4, tableCardArray2));
console.log("player 4 hand category = ",player_4.hand, "\n", player_4.category);
