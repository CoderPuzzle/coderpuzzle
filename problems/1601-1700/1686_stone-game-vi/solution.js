/**
 * @param {number[]} aliceValues
 * @param {number[]} bobValues
 * @return {number}
 */
var stoneGameVI = function (aliceValues, bobValues) {
    const n = aliceValues.length;
    // Taking a stone gains your value AND denies the opponent theirs, so
    // both players effectively compete for aliceValues[i] + bobValues[i].
    const order = Array.from({ length: n }, (_, i) => i);
    order.sort((i, j) => aliceValues[j] + bobValues[j] - (aliceValues[i] + bobValues[i]));
    let diff = 0;
    for (let rank = 0; rank < n; rank++) {
        const i = order[rank];
        if (rank % 2 === 0) {
            diff += aliceValues[i]; // Alice picks ranks 0, 2, 4, ...
        } else {
            diff -= bobValues[i]; // Bob picks ranks 1, 3, 5, ...
        }
    }
    return diff > 0 ? 1 : diff < 0 ? -1 : 0;
};
