const l = require("./logging.js");
 
let compairPlayers = (playerArray) => {
    var arrayOfLevels = [];
    playerArray.forEach(player => {
        arrayOfLevels.push(player.category.level);
    });
    l.Logger("Arrays for compare = ", arrayOfLevels);
    let levelWinner = Math.max(...arrayOfLevels);
    let winner = [];
    if (levelWinner == 0) {
        return ["NOWINNER"];
    } else {
        playerArray.forEach(player => {                                 //get highest level
            if (player.category.level == levelWinner) {
                winner.push(player);
            }
        });
        l.Logger("winner length = ",winner.length);
        if (winner.length != 1) {
            var arrayOfHandValues = [];
            winner.forEach(player => {
                arrayOfHandValues.push(player.category.value);
            });
            let handWinner = Math.max(...arrayOfHandValues);
            let valueWinner = [];
            winner.forEach(player => {                                  // get heighest hand value
                if (player.category.value == handWinner) {
                    valueWinner.push(player);
                }
            });
            l.Logger("valueWinner = ", valueWinner);
            if (valueWinner.length != 1) {                              // get sum of hands ** i am inventing this rule, however i think it is still possible to have more than one winner **
                let playerHandSum = [];
                valueWinner.forEach(player => {
                    let handSum = 0;
                    player.hand.forEach(card =>{
                        handSum += card.value;
                    });
                    playerHandSum.push(handSum);
                });
                handSumWinner = Math.max(...playerHandSum);
                l.Logger("=== return type handSumWinner === \n",valueWinner[playerHandSum.indexOf(handSumWinner)])
                return [valueWinner[playerHandSum.indexOf(handSumWinner)]];            
            } else {
                l.Logger("=== return type valueWinner === \n",valueWinner)
            return valueWinner;
            }
        } else {
            l.Logger("=== return type winner === \n",winner)
            return winner;
        }
    }
}

exports.CompairPlayers = compairPlayers;