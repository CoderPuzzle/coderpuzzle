/**
 * @param {number[]} coins
 * @param {number} target
 * @return {number}
 */
var minimumAddedCoins = function (coins, target) {
    coins = coins.slice().sort((a, b) => a - b);
    let reach = 0; // every value in [1, reach] is obtainable
    let added = 0;
    let i = 0;
    while (reach < target) {
        if (i < coins.length && coins[i] <= reach + 1) {
            reach += coins[i];
            i++;
        } else {
            // must add the coin worth reach + 1
            reach += reach + 1;
            added++;
        }
    }
    return added;
};
