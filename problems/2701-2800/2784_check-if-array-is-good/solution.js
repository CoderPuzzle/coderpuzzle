/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isGood = function (nums) {
    // A permutation of base[m] has maximum m and length m + 1, so the
    // maximum leaves exactly one candidate array to match. Sort a copy
    // of nums and compare it against the literally constructed
    // [1, ..., m - 1, m, m]. For m = 1 the ascending range is empty and
    // the expected array is just [1, 1], which is base[1] itself.
    const largest = Math.max(...nums);
    if (nums.length !== largest + 1) {
        // base[m] has length m + 1; a disagreement rules out every base.
        return false;
    }
    const expected = [];
    for (let value = 1; value < largest; ++value) {
        expected.push(value);
    }
    expected.push(largest, largest);
    const sortedNums = [...nums].sort((a, b) => a - b);
    return sortedNums.every((value, index) => value === expected[index]);
};
