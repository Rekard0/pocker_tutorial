const card = require("./card.js");

const names = card.Names;
const suits = card.Suits;

// define categories
// high_cards , one_pair , two_pair , three_of_a_kind , straight , flush , full_house , four_of_a_kind , stright_flush , royal_flush
const category = {
    high_cards : "High Cards",
    one_pair : "One Pair",
    two_pair : "Two Pair",
    three_of_a_kind : "Three Of A Kind",
    straight : "Straight",
    flush : "Flush",
    full_house : "Full House",
    four_of_a_kind : "Four Of A Kind",
    stright_flush : "Stright Flush",
    royal_flush : "Royal Flush"
}

let categoryLevel = () => {
    let levels = [];
    let counter = 0;
    for(elem in category) {
        levels.push({key: elem, level: ++counter});
    }
    return levels;
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
        player.category.name = category.high_cards;
        player.category.level = categoryLevel().find(x => x.key == "high_cards").level;
        player.category.value = spreadCards[0].value;
    }

    //checking for the same kinds by value
    // tried with reduce but failed :(
    let sameObj = {};
    spreadCards.forEach((card) => { 
        sameObj[card.value] = (sameObj[card.value]||0) + 1;
        console.log(sameObj);
    });
    console.log("same kinds = ", sameObj);
    // checking for
    for(elem in sameObj){
        console.log("entering for... ", elem)
        switch (sameObj[elem]) {
            case 2:
                console.log("2 trigured")
                let searching42pair = {};
                // should have a way for checking for 2 pairs
                player.category.name = category.one_pair;
                let valuCard = spreadCards.find(x => x.value == elem);
                // console.log("valueCard =", valuCard); 
                player.category.level = categoryLevel().find(x => x.key == "one_pair").level;
                player.category.value = valuCard.value
                break;
            
            case 3:
                player.category.name = category.three_of_a_kind;
                player.category.level = categoryLevel().find(x => x.key == "three_of_a_kind").level;
                player.category.value = spreadCards.find(x => x.value == elem).value; // TypeError: Cannot read property 'value' of undefined 
                break;

            case 4:
                player.category.name = category.four_of_a_kind;
                player.category.level = categoryLevel().find(x => x.key == "four_of_a_kind").level;
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
exports.CategoryLevel = categoryLevel;
exports.CalculateCategory = calculateCategory;