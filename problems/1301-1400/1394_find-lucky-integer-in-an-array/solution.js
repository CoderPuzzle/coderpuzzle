/**
 * @param {number[]} arr
 * @return {number}
 */
var findLucky = function (arr) {
    // Values are bounded by 500, so a fixed tally array replaces a hash
    // map. Scanning it downward returns the largest value whose count
    // equals the value itself; -1 survives when none matches.
    const counts = new Array(501).fill(0);
    for (const value of arr) {
        ++counts[value];
    }
    for (let value = 500; value > 0; --value) {
        if (counts[value] === value) {
            return value;
        }
    }
    return -1;
};
