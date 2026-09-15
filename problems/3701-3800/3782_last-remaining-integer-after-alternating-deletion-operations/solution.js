/**
 * @param {number} n
 * @return {number}
 */
var lastInteger = function (n) {
    let start = 1,
        step = 1,
        remaining = n;
    let fromLeft = true;
    while (remaining > 1) {
        if (!fromLeft && remaining % 2 === 0) {
            start += step;
        }
        remaining = Math.floor((remaining + 1) / 2);
        step *= 2;
        fromLeft = !fromLeft;
    }
    return start;
};
