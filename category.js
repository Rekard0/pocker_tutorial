


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
        levels.push(elem, ++counter);
    }
    return levels;
}


// calculate category
let calculateCategory = (player, tCards) => {
    // get table card and player card and create a spreaded array
    let spreadCards = [...player.hand,...tCards];
    // sorting the cards by its value key .... !!!! i have no idea how it works
    spreadCards.sort((a, b) => b.value - a.value);
    // check if the spread form any of the categories
    // checking for high cards
    if (spreadCards[0].value > 10) {
        // then it is high card
        player.category.name = category.high_cards;
        player.category.value = spreadCards[0].value;
    }

    return spreadCards;
}

// compare categories


exports.Category = category;
exports.CategoryLevel = categoryLevel;
exports.CalculateCategory = calculateCategory;