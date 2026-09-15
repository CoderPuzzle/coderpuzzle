/**
 * @param {number} num
 * @return {number}
 */
var smallestNumber = function (num) {
    // The sign only picks the sort direction: a negative result is
    // smallest when its magnitude is largest (digits descending), a
    // positive one when the smallest nonzero digit leads and the
    // zeroes follow it instead of preceding it. Every value here
    // satisfies |num| <= 10^15 < 2^53, so Number carries the digits
    // and the rebuilt result exactly.
    if (num === 0) {
        return 0;
    }
    const negative = num < 0;
    const digits = String(Math.abs(num)).split("").sort();
    if (negative) {
        digits.reverse();
    } else {
        const index = digits.findIndex((digit) => digit !== "0");
        [digits[0], digits[index]] = [digits[index], digits[0]];
    }
    const value = Number(digits.join(""));
    return negative ? -value : value;
};
