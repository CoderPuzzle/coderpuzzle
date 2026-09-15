/**
 * @param {number[]} stones
 * @return {boolean}
 */
var stoneGameIX = function (stones) {
    const counts = [0, 0, 0];
    for (const stone of stones) ++counts[stone % 3];

    if (counts[0] % 2 === 0) {
        return counts[1] > 0 && counts[2] > 0;
    }
    return Math.abs(counts[1] - counts[2]) > 2;
};
