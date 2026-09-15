/**
 * @param {number} num
 * @return {number[]}
 */
var sumOfThree = function (num) {
    // Three consecutive integers x-1, x, x+1 sum to exactly 3x, so a
    // triple exists iff num is a multiple of 3. num reaches 10^15, within
    // the safe-integer range of JS numbers.
    if (num % 3 !== 0) {
        return [];
    }
    const mid = Math.floor(num / 3);
    return [mid - 1, mid, mid + 1];
};
