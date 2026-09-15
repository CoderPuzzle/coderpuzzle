/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
var numRescueBoats = function (people, limit) {
    const sorted = [...people].sort((a, b) => a - b);
    let i = 0;
    let j = sorted.length - 1;
    let boats = 0;
    while (i <= j) {
        // The heaviest boards either way; the lightest is their best
        // partner, since a heavier one only risks exceeding the limit.
        // The i < j guard keeps the last person from pairing with themself.
        if (i < j && sorted[i] + sorted[j] <= limit) {
            i++;
        }
        j--;
        boats++;
    }
    return boats;
};
