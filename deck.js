const card = require("./card.js");

// function Card(value, name, suit){
// 	let card_obj = {"value":value, "name":name, "suit":suit};
// 	return card_obj;
// }

function Deck(){
	names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
	suits = ['Hearts','Diamonds','Spades','Clubs'];
	let cards = [];

    suits.forEach(function(suit, i) {
        names.forEach(function(name, j){
            cards.push(card.Card(j+2, name, suit));
        })
    });
    // console.log(cards.length)
    return cards;
}

function Shuffle(array) {
    // console.log("Start Shuffling ...")
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