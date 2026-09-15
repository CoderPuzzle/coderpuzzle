/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var countOperations = function (num1, num2) {
    // Straight simulation: the larger value loses a copy of the smaller
    // each round, so the pair strictly shrinks and zero arrives quickly.
    let operations = 0;
    while (num1 !== 0 && num2 !== 0) {
        if (num1 >= num2) {
            num1 -= num2;
        } else {
            num2 -= num1;
        }
        operations += 1;
    }
    return operations;
};
