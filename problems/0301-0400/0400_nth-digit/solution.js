/**
 * @param {number} n
 * @return {number}
 */
var findNthDigit = function (n) {
    // The sequence splits into blocks by digit length: the 1-digit
    // numbers contribute 9 digits, the 2-digit numbers 180, the
    // 3-digit numbers 2700 — the d-digit block contributes
    // 9 * 10^(d-1) * d. Subtract whole blocks until n lands inside
    // block d, whose numbers start at 10^(d-1); the digit then
    // belongs to base + (n - 1) / d, at offset (n - 1) % d inside it.
    let remaining = n;
    let digits = 1;
    let base = 1;
    let block = 9;
    while (remaining > block) {
        remaining -= block;
        digits += 1;
        base *= 10;
        block = 9 * base * digits;
    }
    const number = base + Math.floor((remaining - 1) / digits);
    return Number(String(number)[(remaining - 1) % digits]);
};
