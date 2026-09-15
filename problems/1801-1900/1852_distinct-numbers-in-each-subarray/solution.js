/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var distinctNumbers = function (nums, k) {
    // One frequency map slides with the window; the running count of values
    // whose frequency is nonzero is the answer per window.
    const ans = [];
    const freq = new Map();
    let distinct = 0;
    for (let i = 0; i < nums.length; i++) {
        const f = (freq.get(nums[i]) ?? 0) + 1;
        freq.set(nums[i], f);
        if (f === 1) {
            distinct++;
        }
        if (i >= k) {
            const left = nums[i - k];
            const g = freq.get(left) - 1;
            freq.set(left, g);
            if (g === 0) {
                distinct--;
            }
        }
        if (i >= k - 1) {
            ans.push(distinct);
        }
    }
    return ans;
};
