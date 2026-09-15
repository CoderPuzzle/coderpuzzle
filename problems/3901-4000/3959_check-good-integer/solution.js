/**
 * @param {number} n
 * @return {boolean}
 */
var checkGoodInteger = function (n) {
    let digitSum = 0;
    let squareSum = 0;
    while (n > 0) {
        const digit = n % 10;
        digitSum += digit;
        squareSum += digit * digit;
        n = Math.floor(n / 10);
    }
    return squareSum - digitSum >= 50;
};
