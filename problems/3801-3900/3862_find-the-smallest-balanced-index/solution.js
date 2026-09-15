/**
 * @param {number[]} nums
 * @return {number}
 */
var smallestBalancedIndex = function (nums) {
    // The total sum is at most 1e14 < 2^53, so Number holds every prefix
    // sum and every saturated suffix product exactly.
    const n = nums.length;
    let total = 0;
    for (const v of nums) {
        total += v;
    }
    const cap = total + 1;
    const suffix = new Array(n + 1).fill(1);
    let prod = 1;
    for (let i = n - 1; i >= 0; i--) {
        if (prod > Math.floor(cap / nums[i])) {
            prod = cap;
        } else {
            prod *= nums[i];
        }
        suffix[i] = prod;
    }
    let left = 0;
    for (let i = 0; i < n; i++) {
        if (left === suffix[i + 1]) {
            return i;
        }
        left += nums[i];
    }
    return -1;
};
