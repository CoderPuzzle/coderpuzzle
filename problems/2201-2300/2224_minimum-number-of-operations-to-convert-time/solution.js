/**
 * @param {string} current
 * @param {string} correct
 * @return {number}
 */
var convertTime = function (current, correct) {
    const toMinutes = (time) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3));
    let diff = toMinutes(correct) - toMinutes(current);
    let operations = 0;
    for (const step of [60, 15, 5, 1]) {
        operations += Math.floor(diff / step);
        diff %= step;
    }
    return operations;
};
