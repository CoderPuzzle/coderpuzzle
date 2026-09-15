/**
 * @param {number} n
 * @param {number} target
 * @return {number}
 */
var makeIntegerBeautiful = function (n, target) {
    // Round n up to the next multiple of 10, then 100, and so on,
    // until the digit sum drops to target or below. Zeroing a suffix
    // is the only move that lowers a digit sum, and the smallest
    // beautiful value >= n is always such a round-up, so the first
    // round that fits is the minimum addition. Every value is at most
    // 10^13 < 2^53, so Number arithmetic is exact; the round-up uses
    // integer remainder to avoid any float division.
    const original = n;
    let base = 10;
    while (digitSum(n) > target) {
        n = n + (base - (n % base));
        base *= 10;
    }
    return n - original;
};

const digitSum = (value) => {
    let total = 0;
    while (value > 0) {
        total += value % 10;
        value = Math.floor(value / 10);
    }
    return total;
};
