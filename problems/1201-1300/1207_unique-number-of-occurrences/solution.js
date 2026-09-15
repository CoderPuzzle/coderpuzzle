/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function (arr) {
    // Count every value, then compare the number of distinct values with
    // the number of distinct counts: they match exactly when no two values
    // share an occurrence count.
    const counts = new Map();
    for (const value of arr) {
        counts.set(value, (counts.get(value) || 0) + 1);
    }
    const seen = new Set(counts.values());
    return seen.size === counts.size;
};
