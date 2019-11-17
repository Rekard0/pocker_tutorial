const _ = require("lodash");
const deck = require("./mods/deck.js");
const player = require("./mods/player.js");
const category = require("./mods/category.js");
const winner = require("./mods/winner.js");

let numberOfPlayers = 6;
let deck_A = deck.Deck();
let playersArray = [];
let tableCardArray = [];
let rounds = [
    { name: "Pre Flop Round", number: 1},
    { name: "Flop Round", number: 2},
    { name: "Turn Round", number: 3},
    { name: "Rinver and final Round", number: 4}
];
let tableFund = 0;

console.log("Creating Deck...\n");
console.log("non-shuffled:\n");
// console.log(deck_A);

let shuffled_deck_A = deck.Suffle(deck_A);
// console.log("Shuffled = \n",shuffled_deck_A);

console.log("Creating Players\n");
// create a function for registering players
function registerPlayers(name, balance){
    let _player = player.Player(name, balance);
    playersArray.push(_player);
    return _player;
}
function unRegisterPlayer(player){
    let indx = playersArray.indexOf(player);
    playersArray = playersArray.splice(indx, indx+1);
}

for (let index = 0; index < numberOfPlayers; index++) {
    registerPlayers("player " + index, 100);
}

// console.log("players are %s \n", JSON.stringify(playersArray));

// distribute cards among players
function distributeCards() {
    playersArray.forEach( (player) => {
        for (let index = 0; index < 2; index++) {
            player.hand.push(shuffled_deck_A[0])
            shuffled_deck_A.shift();
        }
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
function distributeOneCardTotable() {
    tableCardArray.push(shuffled_deck_A[0])
        shuffled_deck_A.shift();
}
function DistributeToTable(roundNumber) {
    if (roundNumber == 1) {
        for (let index = 0; index < 3; index++) {
            distributeOneCardTotable();
        }
    } else {
        distributeOneCardTotable();
    }
}

// running the rounds
rounds.forEach((round, number) => {
    console.log("Starting ...", round)
    DistributeToTable(number);
    console.log("Cards on table = \n", tableCardArray);
    playersArray.forEach(player => {
        console.log("Assesing player hand\n", category.CalculateCategory(player, tableCardArray));
        console.log("Player hand\n", player.hand, "and its catagory\n", player.category);
    });
    let roundWinner = winner.CompairPlayers(playersArray); // TODO: some bug happens to hand ... strange ...
    console.log("=== Round Winner === \n", roundWinner);
});

