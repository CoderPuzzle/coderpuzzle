/**
 * @param {number} num
 * @return {number}
 */
var maximum69Number = function (num) {
    // The leftmost 6 carries the most weight, so flipping it is the one best
    // change; no 6 at all means the number is already maximal.
    return parseInt(String(num).replace("6", "9"), 10);
};
