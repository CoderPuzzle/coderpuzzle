/**
 * @param {number[]} weight
 * @return {number}
 */
var maxNumberOfApples = function (weight) {
    // Lightest apples first: any optimal packing can be assumed to consist of
    // them, so a sorted greedy prefix is exactly optimal.
    weight.sort(function (a, b) {
        return a - b;
    });
    var total = 0;
    for (var i = 0; i < weight.length; i++) {
        if (total + weight[i] > 5000) {
            return i;
        }
        total += weight[i];
    }
    return weight.length;
};
