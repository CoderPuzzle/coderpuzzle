/**
 * @param {number} n
 * @return {boolean}
 */
var isArmstrong = function (n) {
    const k = String(n).length;
    let total = 0;
    let remaining = n;
    while (remaining > 0) {
        const digit = remaining % 10;
        total += digit ** k;
        remaining = Math.floor(remaining / 10);
    }
    return total === n;
};
