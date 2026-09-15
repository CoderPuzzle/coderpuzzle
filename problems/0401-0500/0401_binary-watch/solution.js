/**
 * @param {number} turnedOn
 * @return {string[]}
 */
var readBinaryWatch = function (turnedOn) {
    // Hours outer, minutes inner: the walk emits the pinned chronological
    // order directly, with no post-sort.
    const times = [];
    for (let hour = 0; hour < 12; hour++) {
        for (let minute = 0; minute < 60; minute++) {
            // A time shows when its lit hour LEDs plus lit minute LEDs equal
            // turnedOn; each lit count is just a popcount.
            if (countOnes(hour) + countOnes(minute) === turnedOn) {
                // "%d:%02d": no hour leading zero, always two minute digits.
                times.push(`${hour}:${String(minute).padStart(2, "0")}`);
            }
        }
    }
    return times;
};

// Clear the lowest set bit until nothing is left: one iteration per 1-bit.
function countOnes(value) {
    let count = 0;
    while (value > 0) {
        value &= value - 1;
        count++;
    }
    return count;
}
