const deck = require("./mods/deck.js");
const utils = require("./mods/utils.js");
const category = require("./mods/category.js");
const winner = require("./mods/winner.js");
const l = require("./mods/logging.js");

let numberOfPlayers = 6;
let playerInitialFund = 100;
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

console.log(`Starting Pocker Simulation...\n if more logging needed set should log to true in logging.js`);
l.Logger("non-shuffled:\n");
l.Logger(deck_A);

let shuffled_deck = deck.Suffle(deck_A);
l.Logger("Shuffled = \n",shuffled_deck);

console.log(`Creating ${numberOfPlayers} Players\n`);
// create a function for registering players
for (let index = 0; index < numberOfPlayers; index++) {
    utils.RegisterPlayers("player " + index, playerInitialFund, playersArray);
}

l.Logger("players hands %s \n", JSON.stringify(playersArray));
l.Logger("remaining Cards in Deck \n");
l.Logger("Shuffled = \n",shuffled_deck);

// creating the rounds
let finalWinner = () => {
        let roundWinner;
        rounds.forEach((round, number) => {
        l.Logger("Starting ...", round)
        utils.DistributeToTable(number, tableCardArray, shuffled_deck);
        l.Logger("Cards on table = \n", tableCardArray);
        playersArray.forEach(player => {
            let bet = utils.RandomNumberInRange(5,15); // lets force player to raise every time
            l.Logger(bet)
            if (player.balance >= bet) {
                player.balance -= bet;
                tableFund += bet;
                l.Logger("=== Assesing player hand === \n");
                category.CalculateCategory(player, tableCardArray)
                l.Logger("=== Player hand ===\n", player.hand, "=== and its catagory ===\n", player.category);
            } else {
                utils.UnRegisterPlayer(player, playersArray);
            }
            l.Logger(player)
        });
        roundWinner = winner.CompairPlayers(playersArray);
        l.Logger("=== Table Fund === \n", tableFund);
        
    });
    l.Logger("=== Round Winner === \n", roundWinner);
    return roundWinner[0];
}

// play while 1 player left && deck have enough cards
let gameCount = 0;
while (deck_A.length > (numberOfPlayers * 2) + 6 && playersArray.length > 1) {
    
    ++gameCount;
    console.log("============================================\nGame No. ", gameCount);
    // clean players hand
    playersArray.map(player => {
        player.hand = [];
    }); 
    // clean table
    tableCardArray = [];
    // distribute cards among players
    utils.DistributeCards(playersArray, shuffled_deck);

    let winnerObj = finalWinner();
    l.Logger("=== Winner OBJ === \n",winnerObj)
    console.log("=== Table Fund === \n", tableFund);
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
}


