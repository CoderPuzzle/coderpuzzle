/**
 * @param {number[]} nums
 * @return {number}
 */
var thirdMax = function (nums) {
    // null marks a slot not yet filled, so even the smallest 32-bit integer
    // is a legal value and no sentinel constant is needed.
    let first = null;
    let second = null;
    let third = null;
    for (const value of nums) {
        // A repeat of an already-tracked value changes nothing.
        if (value === first || value === second || value === third) continue;
        if (first === null || value > first) {
            third = second;
            second = first;
            first = value;
        } else if (second === null || value > second) {
            third = second;
            second = value;
        } else if (third === null || value > third) {
            third = value;
        }
    }
    // No third distinct maximum: fall back to the maximum.
    return third !== null ? third : first;
};
