/**
 * @param {number[]} nums
 * @param {number} digit
 * @return {number}
 */
var countDigitOccurrences = function (nums, digit) {
    // Peel each value's decimal digits with repeated division by ten.
    // Every element is at least 1 (never 0), so the loop faithfully
    // covers its digits with no leading-zero special case.
    let total = 0;
    for (let x of nums) {
        while (x > 0) {
            if (x % 10 === digit) {
                total += 1;
            }
            x = Math.floor(x / 10);
        }
    }
    return total;
};
