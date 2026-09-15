/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortByAbsoluteValue = function (nums) {
    // Numeric comparator (|a|, a) — the default sort would compare the
    // elements as strings, which scrambles any mixed-sign array. Magnitude
    // orders the array; the signed value breaks every magnitude tie so -x
    // always lands before x.
    nums.sort((a, b) => Math.abs(a) - Math.abs(b) || a - b);
    // The tie-break makes the ordering total on distinct outcomes, so the
    // result is unique regardless of the sort's stability.
    return nums;
};
