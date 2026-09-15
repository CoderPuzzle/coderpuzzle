/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isPossibleToSplit = function (nums) {
    const frequencies = new Map();
    for (const num of nums) {
        frequencies.set(num, (frequencies.get(num) ?? 0) + 1);
        if (frequencies.get(num) > 2) {
            return false;
        }
    }
    return true;
};
