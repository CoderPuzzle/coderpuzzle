/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function (num) {
    // The statement's own process, carried out literally: while the value
    // has more than one digit, replace it by the sum of its digits.
    while (num >= 10) {
        // One round: peel digits off the low end into a running sum.
        let total = 0;
        for (let value = num; value > 0; value = Math.floor(value / 10)) {
            total += value % 10;
        }
        num = total;
    }
    return num;
};
