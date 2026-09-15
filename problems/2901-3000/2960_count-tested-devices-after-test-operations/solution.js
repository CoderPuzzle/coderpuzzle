/**
 * @param {number[]} batteryPercentages
 * @return {number}
 */
var countTestedDevices = function (batteryPercentages) {
    // Each earlier test subtracts exactly 1 from every not-yet-tested device
    // (floored at zero — exactly the "no longer testable" case), so when the
    // scan reaches device i its live percentage is the original value minus
    // the number of tests performed so far. The device is tested iff that
    // original value still exceeds the count, which reproduces the
    // suffix-updating simulation with a counter.
    let tested = 0;
    for (const percent of batteryPercentages) {
        if (percent > tested) {
            ++tested;
        }
    }
    return tested;
};
