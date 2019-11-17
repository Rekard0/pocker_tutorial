
 
let compairPlayers = (playerArray) => {
    var arrayOfLevels = [];
    playerArray.forEach(player => {
        arrayOfLevels.push(player.category.level);
    });
    // console.log("Arrays for compare = ", arrayOfLevels);
    let levelWinner = Math.max(...arrayOfLevels);
    let winner = [];
    if (levelWinner == 0) {
        return "NOWINNER";
    } else {
        playerArray.forEach(player => {                                 //get highest level
            if (player.category.level == levelWinner) {
                winner.push(player);
            }
        });
        // console.log("winner length = ",winner.length);
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
            // console.log("valueWinner = ", valueWinner);
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
                return valueWinner[playerHandSum.indexOf(handSumWinner)];            
            } else {
            return valueWinner;
            }
        } else {
            return winner;
        }
    }
}

exports.CompairPlayers = compairPlayers;