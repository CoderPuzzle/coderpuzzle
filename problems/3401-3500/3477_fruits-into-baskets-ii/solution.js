/**
 * @param {number[]} fruits
 * @param {number[]} baskets
 * @return {number}
 */
var numOfUnplacedFruits = function (fruits, baskets) {
    // The rules fix every decision, so simulate them directly: each fruit
    // takes the leftmost free basket that fits, scanning from index 0.
    const used = new Array(baskets.length).fill(false);
    let unplaced = 0;
    for (const quantity of fruits) {
        let j = 0;
        // skip occupied baskets and capacities that are too small
        while (j < baskets.length && (used[j] || baskets[j] < quantity)) {
            j++;
        }
        if (j === baskets.length) {
            // scan ran off the end: nothing fits this fruit
            unplaced++;
        } else {
            used[j] = true;
        }
    }
    return unplaced;
};
