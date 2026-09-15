/**
 * @param {number[]} bulbs
 * @return {number[]}
 */
var toggleLightBulbs = function (bulbs) {
    // Toggle a fixed table indexed by bulb number; a bulb ends on exactly when
    // it is toggled an odd number of times. Sweep indices 1..100 and collect
    // the on positions — ascending order for free.
    const on = new Array(101).fill(false);
    for (const value of bulbs) {
        on[value] = !on[value];
    }
    const result = [];
    for (let i = 1; i <= 100; i++) {
        if (on[i]) {
            result.push(i);
        }
    }
    return result;
};
