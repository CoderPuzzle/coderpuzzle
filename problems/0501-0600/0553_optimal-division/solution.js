/**
 * @param {number[]} nums
 * @return {string}
 */
var optimalDivision = function (nums) {
    // One or two values leave nothing to regroup, so the bare left-to-right
    // join is the whole answer. From three on, every value is positive and
    // the expression is maximized by dividing nums[0] by the smallest
    // possible denominator — the flat chain a1/a2/.../an-1 =
    // a1/(a2*...*an-1), which pulls every later value into that
    // denominator's numerator.
    const parts = nums.map((value) => String(value));
    if (parts.length <= 2) {
        return parts.join("/");
    }
    return parts[0] + "/(" + parts.slice(1).join("/") + ")";
};
