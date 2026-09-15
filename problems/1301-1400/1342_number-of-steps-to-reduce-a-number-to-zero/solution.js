/**
 * @param {number} num
 * @return {number}
 */
var numberOfSteps = function (num) {
    // Halve when even, subtract one when odd; every step strictly decreases
    // the value, so the loop always terminates.
    let steps = 0;
    while (num > 0) {
        if (num % 2 === 0) {
            num = Math.floor(num / 2);
        } else {
            num -= 1;
        }
        steps += 1;
    }
    return steps;
};
