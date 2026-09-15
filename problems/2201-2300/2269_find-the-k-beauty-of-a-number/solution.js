/**
 * @param {number} num
 * @param {number} k
 * @return {number}
 */
var divisorSubstrings = function (num, k) {
    // Slide a length-k window over the digit string, keeping the window's
    // integer value incrementally: drop the leading digit, shift, add the
    // new trailing digit. A zero window never divides num.
    const digits = String(num);
    const power = 10 ** (k - 1);
    let window = Number(digits.slice(0, k));
    let count = 0;
    if (window !== 0 && num % window === 0) {
        count++;
    }
    for (let i = k; i < digits.length; i++) {
        window = (window % power) * 10 + Number(digits[i]);
        if (window !== 0 && num % window === 0) {
            count++;
        }
    }
    return count;
};
