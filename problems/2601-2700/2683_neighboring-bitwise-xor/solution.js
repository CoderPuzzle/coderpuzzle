/**
 * @param {number[]} derived
 * @return {boolean}
 */
var doesValidArrayExist = function (derived) {
    // Each original element enters exactly two derived entries (its own slot
    // and its neighbour's), so folding derived with XOR cancels every pair
    // and lands on 0 exactly when a valid original exists.
    let total = 0;
    for (let i = 0; i < derived.length; ++i) {
        total ^= derived[i];
    }
    return total === 0;
};
