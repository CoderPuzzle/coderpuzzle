/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findLeastNumOfUniqueInts = function (arr, k) {
    const counts = new Map();
    for (const value of arr) {
        counts.set(value, (counts.get(value) || 0) + 1);
    }
    const freqs = [...counts.values()].sort((a, b) => a - b);
    let remaining = freqs.length;
    for (const count of freqs) {
        if (k >= count) {
            k -= count;
            remaining--;
        } else {
            break;
        }
    }
    return remaining;
};
