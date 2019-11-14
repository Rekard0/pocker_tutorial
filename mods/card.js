
const names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['Hearts','Diamonds','Spades','Clubs'];

let Card = function(value, name, suit){
	let card_obj = {"value":value, "name":name, "suit":suit};
	return card_obj;
}

// exports.Card = Card(value, name, suit);

exports.Card = Card;
exports.Names = names;
exports.Suits = suits;
