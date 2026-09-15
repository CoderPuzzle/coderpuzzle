/**
 * @param {number[]} flips
 * @return {number}
 */
var numTimesAllBlue = function (flips) {
    let rightmost = 0;
    let count = 0;
    for (let i = 0; i < flips.length; i++) {
        if (flips[i] > rightmost) rightmost = flips[i];
        if (rightmost === i + 1) count += 1;
    }
    return count;
};
