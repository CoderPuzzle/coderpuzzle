/**
 * @param {string[]} operations
 * @return {number}
 */
var finalValueAfterOperations = function (operations) {
    let value = 0;
    for (const operation of operations) {
        value += operation[1] === "+" ? 1 : -1;
    }
    return value;
};
