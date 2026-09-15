/**
 * @param {number[]} arr
 * @return {number[]}
 */
var arrayRankTransform = function (arr) {
    // Rank = position in the sorted distinct values, 1-based; the map is then
    // applied in input order so the output preserves positions.
    const distinct = [...new Set(arr)].sort((a, b) => a - b);
    const ranks = new Map();
    distinct.forEach((value, index) => ranks.set(value, index + 1));
    return arr.map((value) => ranks.get(value));
};
