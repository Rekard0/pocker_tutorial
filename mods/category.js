const card = require("./card.js");
const _ = require("lodash");

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
    // console.log("unsorted ",spreadCards)
    // sorting the cards by its value key .... !!!! i have no idea how it works, but it seems to work
    spreadCards.sort((a, b) => b.value - a.value);
    // console.log("sorted ",spreadCards)
    // check if the spread form any of the categories

    // checking for ----------------- high cards ---------------------
    let sortedHand = player.hand.sort((a, b) => b.value - a.value);
    if (sortedHand[0].value > 10) { // check if the hand have potencial of high card
        // then it is high card
        player.category.name = category.high_cards.name;
        player.category.level = category.high_cards.level;
        player.category.value = sortedHand[0].value;
    }

    //checking for the same kinds by value
    // tried with reduce but failed :(
    let sameObj = {};
    spreadCards.forEach((card) => { 
        sameObj[card.value] = (sameObj[card.value]||0) + 1;
        // console.log(sameObj); // for seeing what it is doing
    });
    // console.log("same kinds = ", sameObj);
    // checking for -------- one & two pair and same kinds -------------
    let pairCounter = 0;
    for(elem in sameObj){
        // console.log("entering for... ", elem)
        let valuCard = spreadCards.find(x => x.value == elem);
        if (player.hand.indexOf(valuCard)  != -1) { // if object is in hand
            switch (sameObj[elem]) {
                case 2:
                    // console.log("2 trigured")   
                    player.category.name = category.one_pair.name;
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
                    // ----------------- three_of_a_kind ---------------------
                    player.category.name = category.three_of_a_kind.name;
                    player.category.level = category.three_of_a_kind.level;
                    player.category.value = spreadCards.find(x => x.value == elem).value;
                    break;

                case 4:
                    // ----------------- four_of_a_kind ---------------------
                    player.category.name = category.four_of_a_kind.name;
                    player.category.level = category.four_of_a_kind.level;
                    player.category.value = spreadCards.find(x => x.value == elem).value;
                    break;
            
                default:
                    break;
            }
        }
    }

    // checking for staright
    let consecativeCounter = {sC:1, sF: 1};
    let consecativeCards = [];
    let matchedHandCardCount = 0;
    if (player.category.level != 8) { // if hand category is four of a kind dont bother checking for straight
        // find five consecative cards
        //////////////////////////////////////// for testing
        let spreadCards2 = [
            { value: 11, name: 'J', suit: 'Club' } ,
            { value: 8, name: '8', suit: 'Club' }  ,
            { value: 4, name: '4', suit: 'Spades' } ,
            { value: 5, name: '5', suit: 'Spades' } ,
            { value: 2, name: '2', suit: 'Spades' } ,
            { value: 11, name: 'J', suit: 'Spades' } ,
            { value: 8, name: '8', suit: 'Spades' }  
            
        ]
        ////////////////////////////////////////
        // console.log("checking for straight ...")
        spreadCards2.reduce((prev, curr) => {
            // console.log(prev, " - ",curr);
            if (prev.value == curr.value +1) {
                ++consecativeCounter.sC;
            }
            if (prev.suit == curr.suit) {
                ++consecativeCounter.sF;
            }
            if (consecativeCards.length != 0) { // creating an array of consecative Cards
                consecativeCards.push(curr);
            } else {
                consecativeCards.push(prev);
                consecativeCards.push(curr);
            }
            
            // console.log("consecativeCounter = ",consecativeCounter);
            // console.log("consecativeCards = ",consecativeCards);
            return prev = curr;
        });
        // assesing straight conditions
        if (consecativeCounter.sC >= 5 || consecativeCounter.sF >= 5) {
            // check if hand has at least one of the 5 cards
            
            player.hand.forEach(handCard => {
                if (_.findIndex(consecativeCards, handCard) != -1) { // stuck here: "consecativeCards.indexOf(handCard) != -1" always false ,, i wonder why? using lodash instead
                    // console.log("hand has a card")
                    ++matchedHandCardCount;
                }
                // console.log("entering hand loop , match count = ", matchedHandCardCount)
            });
            // ----------------- straight ---------------------
            if (consecativeCounter.sC >= 5 && matchedHandCardCount > 0) { 
                player.category.name = category.straight.name;
                player.category.level = category.straight.level;
                player.category.value = sortedHand[0].value;
            }
            // ----------------- flush ---------------------
            if (consecativeCounter.sF >= 5 && matchedHandCardCount > 0 && consecativeCounter.sC < 5) {
                player.category.name = category.flush.name;
                player.category.level = category.flush.level;
                player.category.value = sortedHand[0].value; // TODO: this is wrong
            }
        }
    }
            // ----------------- stright_flush ---------------------
            if (consecativeCounter.sF >= 5 && matchedHandCardCount > 0 && consecativeCounter.sC >= 5) {
                
                    if (sortedHand[0].value == 14) {
                        // ----------------- royal_flush ---------------------
                        player.category.name = category.royal_flush.name;
                        player.category.level = category.royal_flush.level;
                        player.category.value = sortedHand[0].value;
                    } else {
                        player.category.name = category.stright_flush.name;
                        player.category.level = category.stright_flush.level;
                        player.category.value = sortedHand[0].value;
                    }
                
            }
            
        //}
    //}

    // checking for full house
    
    return "calculation done...\n";
}

// compare categories


exports.Category = category;
exports.CalculateCategory = calculateCategory;