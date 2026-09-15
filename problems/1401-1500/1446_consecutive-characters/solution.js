/**
 * @param {string} s
 * @return {number}
 */
var maxPower = function (s) {
    let best = 1;
    let current = 1;
    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
            current++;
            if (current > best) {
                best = current;
            }
        } else {
            current = 1;
        }
    }
    return best;
};
