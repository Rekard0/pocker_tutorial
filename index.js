const _ = require("lodash");
const deck = require("./mods/deck.js");
const utils = require("./mods/utils.js");
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

let shuffled_deck = deck.Suffle(deck_A);
// console.log("Shuffled = \n",shuffled_deck_A);

console.log("Creating Players\n");
// create a function for registering players
for (let index = 0; index < numberOfPlayers; index++) {
    utils.RegisterPlayers("player " + index, 100, playersArray);
}

// console.log("players are %s \n", JSON.stringify(playersArray));

// distribute cards among players
utils.DistributeCards(playersArray, shuffled_deck);
// console.log("players hands %s \n", JSON.stringify(playersArray));
// console.log("remaining Cards in Deck \n");
// console.log("Shuffled = \n",shuffled_deck_A);

// creating the rounds
let finalWinner = () => {
        let roundWinner;
        rounds.forEach((round, number) => {
        console.log("Starting ...", round)
        utils.DistributeToTable(number, tableCardArray, shuffled_deck);
        console.log("Cards on table = \n", tableCardArray);
        playersArray.forEach(player => {
            let bet = utils.RandomNumberInRange(5,15); // lets force player to raise every time
            console.log(bet)
            if (player.balance >= bet) {
                player.balance -= bet;
                tableFund += bet;
                console.log("=== Assesing player hand === \n", category.CalculateCategory(player, tableCardArray));
                console.log("=== Player hand ===\n", player.hand, "=== and its catagory ===\n", player.category);
            } else {
                utils.UnRegisterPlayer(player, playersArray);
            }
            console.log(player)
        });
        roundWinner = winner.CompairPlayers(playersArray);
        console.log("=== Table Fund === \n", tableFund);
        
    });
    console.log("=== Round Winner === \n", roundWinner);
    return roundWinner[0];
}

let winnerObj = finalWinner();
console.log("=== Winner OBJ === \n",winnerObj)

if (winnerObj != "NOWINNER") {
    playersArray.forEach(player => {
        if (player.name == winnerObj.name) {
            player.balance += tableFund;
        }
    });
    tableFund = 0;
    console.log("=== players left === \n", playersArray.length);
    console.log("=== River Round Winner === \n", winnerObj);
}

