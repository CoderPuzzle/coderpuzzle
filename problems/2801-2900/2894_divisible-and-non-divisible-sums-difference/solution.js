/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var differenceOfSums = function (n, m) {
    // [1, n] splits into two arithmetic progressions: the multiples of
    // m are m, 2m, ..., km with k = floor(n / m) and sum m * k * (k + 1) / 2,
    // while num1 is the full progression 1..n minus those multiples.
    const k = Math.floor(n / m);
    const num2 = (m * k * (k + 1)) / 2;
    const num1 = (n * (n + 1)) / 2 - num2;
    // n <= 1000 keeps every intermediate <= 1001000: exact as a JS Number
    // (well under 2^53) and far inside 32 bits.
    return num1 - num2;
};
