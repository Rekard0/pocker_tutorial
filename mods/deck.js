const card = require("./card.js");
const l = require("./logging.js");

const names = card.Names;
const suits = card.Suits;

function Deck(){
	let cards = [];

    suits.forEach(function(suit, i) {
        names.forEach(function(name, j){
            cards.push(card.Card(j+2, name, suit));
        })
    });
    l.Logger(cards.length)
    return cards;
}

function Shuffle(array) {
    l.Logger("Start Shuffling ...")
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

exports.Deck = Deck;
exports.Suffle = Shuffle;