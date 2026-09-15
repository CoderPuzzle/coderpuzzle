/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var rotateElements = function (nums, k) {
    // Gather the non-negative values in scan order, compute the effective
    // left shift k % m once, then scatter values[(j + shift) % m] into the
    // j-th originally non-negative slot — negatives are never touched.
    const values = nums.filter((value) => value >= 0);
    const m = values.length;
    const result = [...nums];
    if (m === 0) {
        return result;
    }
    const shift = k % m;
    let at = 0;
    for (let index = 0; index < nums.length; index++) {
        if (nums[index] >= 0) {
            result[index] = values[(at + shift) % m];
            at++;
        }
    }
    return result;
};
