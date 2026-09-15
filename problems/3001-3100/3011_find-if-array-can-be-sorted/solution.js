/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canSortArray = function (nums) {
    let previousMax = 0;
    let currentMax = 0;
    let currentBits = 0;
    for (const value of nums) {
        let bits = 0;
        for (let rest = value; rest > 0; rest >>>= 1) bits += rest & 1;
        if (bits !== currentBits) {
            previousMax = currentMax;
            currentBits = bits;
            currentMax = 0;
        }
        if (value < previousMax) {
            return false;
        }
        if (value > currentMax) {
            currentMax = value;
        }
    }
    return true;
};
