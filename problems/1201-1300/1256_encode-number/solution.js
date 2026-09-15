/**
 * @param {number} num
 * @return {string}
 */
var encode = function (num) {
    // num + 1 in binary, minus its leading 1.
    return (num + 1).toString(2).slice(1);
};
