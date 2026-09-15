/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var getLucky = function (s, k) {
    // Convert letters to their 1..26 positions as a digit string, then
    // apply the digit-sum transform k times. The concatenated value stays
    // a string: 100 letters -> up to 200 digits, far beyond any safe
    // fixed-width integer.
    let digits = "";
    for (const ch of s) {
        digits += ch.charCodeAt(0) - 96;
    }
    for (let i = 0; i < k; ++i) {
        let sum = 0;
        for (const d of digits) {
            sum += d.charCodeAt(0) - 48;
        }
        digits = String(sum);
    }
    return Number(digits);
};
