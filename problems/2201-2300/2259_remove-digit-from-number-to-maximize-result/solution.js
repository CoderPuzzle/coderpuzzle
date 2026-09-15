/**
 * @param {string} number
 * @param {string} digit
 * @return {string}
 */
var removeDigit = function (number, digit) {
    let best = null;
    for (let i = 0; i < number.length; i++) {
        if (number[i] === digit) {
            const candidate = number.slice(0, i) + number.slice(i + 1);
            if (best === null || candidate > best) {
                best = candidate;
            }
        }
    }
    return best;
};
