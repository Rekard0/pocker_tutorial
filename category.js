const card = require("./card.js");

const names = card.Names;
const suits = card.Suits;

// define categories
// high_cards , one_pair , two_pair , three_of_a_kind , straight , flush , full_house , four_of_a_kind , stright_flush , royal_flush
const category = {
    high_cards : {name: "High Cards", level: 1},
    one_pair : {name: "One Pair", level: 2},
    two_pair : {name: "Two Pair", level: 3},
    three_of_a_kind : {name: "Three Of A Kind", level: 4},
    straight : {name: "Straight", level: 5},
    flush : {name: "Flush", level: 6},
    full_house : {name: "Full House", level: 7},
    four_of_a_kind : {name: "Four Of A Kind", level: 8},
    stright_flush : {name: "Stright Flush", level: 9},
    royal_flush : {name: "Royal Flush", level: 10}
}

// calculate category
let calculateCategory = (player, tCards) => {
    // get table card and player card and create a spreaded array
    let spreadCards = [...player.hand,...tCards];
    console.log("unsorted ",spreadCards)
    // sorting the cards by its value key .... !!!! i have no idea how it works, but it seems to work
    spreadCards.sort((a, b) => b.value - a.value);
    console.log("sorted ",spreadCards)
    // check if the spread form any of the categories

    // checking for high cards
    if (spreadCards[0].value > 10) {
        // then it is high card
        player.category.name = category.high_cards.name;
        player.category.level = category.high_cards.level;
        player.category.value = spreadCards[0].value;
    }

    //checking for the same kinds by value
    // tried with reduce but failed :(
    let sameObj = {};
    spreadCards.forEach((card) => { 
        sameObj[card.value] = (sameObj[card.value]||0) + 1;
        // console.log(sameObj); // for seeing what it is doing
    });
    console.log("same kinds = ", sameObj);
    // checking for one & two pair and same kinds
    let pairCounter = 0;
    for(elem in sameObj){
        // console.log("entering for... ", elem)
        switch (sameObj[elem]) {
            case 2:
                // console.log("2 trigured")
                player.category.name = category.one_pair.name;
                let valuCard = spreadCards.find(x => x.value == elem);
                // console.log("valueCard =", valuCard); 
                player.category.level = category.one_pair.level;
                player.category.value = valuCard.value

                // should have a way of checking for 2 pairs
                pairCounter++
                if (pairCounter == 2) { // == 2 prevent from count for more pairs if table has more 3 card in the next round
                    player.category.name = category.two_pair.name; 
                    player.category.level = category.two_pair.level;
                }
                break;
            
            case 3:
                player.category.name = category.three_of_a_kind.name;
                player.category.level = category.three_of_a_kind.level;
                player.category.value = spreadCards.find(x => x.value == elem).value;
                break;

            case 4:
                player.category.name = category.four_of_a_kind.name;
                player.category.level = category.four_of_a_kind.level;
                player.category.value = spreadCards.find(x => x.value == elem).value;
                break;
        
            default:
                break;
        }
    }
    
    return spreadCards;
}

// compare categories


exports.Category = category;
exports.CalculateCategory = calculateCategory;