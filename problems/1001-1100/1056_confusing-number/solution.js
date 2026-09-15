/**
 * @param {number} n
 * @return {boolean}
 */
var confusingNumber = function (n) {
    // Peeling digits off with % 10 / 10 already visits them in the order a
    // 180-degree rotation puts them in (units digit first, so it lands
    // most-significant in the rotated value).
    const rotate = { 0: 0, 1: 1, 6: 9, 8: 8, 9: 6 };

    const original = n;
    let rotated = 0;
    while (n > 0) {
        const digit = n % 10;
        if (!(digit in rotate)) {
            return false;
        }
        rotated = rotated * 10 + rotate[digit];
        n = Math.floor(n / 10);
    }
    return rotated !== original;
};
