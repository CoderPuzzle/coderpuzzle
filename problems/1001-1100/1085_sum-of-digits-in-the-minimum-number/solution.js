/**
 * @param {number[]} nums
 * @return {number}
 */
var sumOfDigits = function (nums) {
    // The answer depends only on the smallest element; sum its digits by
    // peeling off the least significant digit one at a time.
    let m = Math.min(...nums);
    let digitSum = 0;
    while (m > 0) {
        digitSum += m % 10;
        m = Math.floor(m / 10);
    }
    return digitSum % 2 !== 0 ? 0 : 1;
};
