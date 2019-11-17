
const player = require("./player.js");

let registerPlayers = (name, balance, playersArray) => {
    let _player = player.Player(name, balance);
    playersArray.push(_player);
    return _player;
}
let unRegisterPlayer = (player, playersArray) => {
    let indx = playersArray.indexOf(player);
    playersArray = playersArray.splice(indx, indx+1);
}

let distributeCards = (playersArray, shuffled_deck_A) => {
    playersArray.forEach( (player) => {
        for (let index = 0; index < 2; index++) {
            player.hand.push(shuffled_deck_A[0])
            shuffled_deck_A.shift();
        }
    });
}

let distributeOneCardTotable = (tableCardArray, shuffled_deck) => {
    tableCardArray.push(shuffled_deck[0])
        shuffled_deck.shift();
}
let distributeToTable = (roundNumber, tableCardArray, shuffled_deck) => {
    if (roundNumber == 1) {
        for (let index = 0; index < 3; index++) {
            distributeOneCardTotable(tableCardArray, shuffled_deck);
        }
    } else {
        distributeOneCardTotable(tableCardArray, shuffled_deck);
    }
}

let randomNumber = (start, end) => {
    let diff = end - start;
    return Math.floor((Math.random() * end) + start);
  }

exports.RegisterPlayers = registerPlayers;
exports.UnRegisterPlayer = unRegisterPlayer;
exports.DistributeCards = distributeCards;
exports.DistributeToTable = distributeToTable;
exports.RandomNumberInRange = randomNumber;