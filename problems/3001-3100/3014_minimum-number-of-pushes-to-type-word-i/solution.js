/**
 * @param {string} word
 * @return {number}
 */
var minimumPushes = function (word) {
    // Distinct letters make frequency irrelevant: dealing them round-robin
    // over the 8 keys costs the p-th letter Math.floor(p / 8) + 1 pushes.
    let total = 0;
    for (let position = 0; position < word.length; position++) {
        total += Math.floor(position / 8) + 1;
    }
    return total;
};
