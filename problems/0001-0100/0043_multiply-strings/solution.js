/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
    // The product of an m-digit and an n-digit number has at most m + n
    // digits, so accumulate raw digit-pair products into exactly that many
    // cells before carrying anything.
    const m = num1.length;
    const n = num2.length;
    const digits = new Array(m + n).fill(0);
    for (let i = m - 1; i >= 0; i--) {
        const d1 = num1.charCodeAt(i) - 48;
        for (let j = n - 1; j >= 0; j--) {
            // Digit i of num1 times digit j of num2 lands at i + j + 1
            // (most-significant-first indexing), so every pair can add
            // into its cell directly; no carrying yet.
            digits[i + j + 1] += d1 * (num2.charCodeAt(j) - 48);
        }
    }
    // One right-to-left pass normalizes each cell to a single digit and
    // pushes the overflow one cell left, exactly like schoolbook carrying.
    let carry = 0;
    for (let k = digits.length - 1; k >= 0; k--) {
        const total = digits[k] + carry;
        digits[k] = total % 10;
        carry = Math.floor(total / 10);
    }
    // Neither input has a leading zero, so the product has m + n or
    // m + n - 1 digits; strip the unused leading cell, keeping at least
    // one digit so "0" operands yield "0" with no special case.
    let start = 0;
    while (start < digits.length - 1 && digits[start] === 0) {
        start++;
    }
    let result = "";
    for (let k = start; k < digits.length; k++) {
        result += String.fromCharCode(48 + digits[k]);
    }
    return result;
};
