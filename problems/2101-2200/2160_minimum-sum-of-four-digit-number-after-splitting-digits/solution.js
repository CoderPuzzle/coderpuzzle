/**
 * @param {number} num
 * @return {number}
 */
var minimumSum = function (num) {
    // The sum of two numbers built from the four digits is minimized by
    // giving the two smallest digits the tens places, so sort and pair
    // smallest+largest into the two two-digit numbers.
    const digits = String(num)
        .split("")
        .map(Number)
        .sort((a, b) => a - b);
    return 10 * (digits[0] + digits[1]) + digits[2] + digits[3];
};
