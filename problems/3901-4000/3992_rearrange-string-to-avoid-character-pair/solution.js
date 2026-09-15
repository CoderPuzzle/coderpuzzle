/**
 * @param {string} s
 * @param {string} x
 * @param {string} y
 * @return {string}
 */
var rearrangeString = function (s, x, y) {
    const letters = s.split("").sort(); // groups equal letters into blocks
    if (x < y) {
        letters.reverse(); // puts the y block before the x block
    }
    return letters.join("");
};
