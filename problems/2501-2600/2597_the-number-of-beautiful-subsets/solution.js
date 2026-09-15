/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var beautifulSubsets = function (nums, k) {
    // Sort, then decide each element take-or-skip in index order.
    // Taking nums[i] is legal exactly when no earlier-taken value
    // equals nums[i] - k — the only conflict a sorted order can
    // create; a counter map tracks how often each taken value occurs
    // (duplicates never clash with each other since k >= 1). Every
    // take/skip leaf is one subset selection; drop the empty one at
    // the end. The answer is at most 2^18 - 1 = 262143, exact in a
    // Number with huge headroom.
    nums.sort((a, b) => a - b);
    const n = nums.length;
    const taken = new Map();
    const count = (i) => {
        if (i === n) return 1;
        let total = count(i + 1);
        if (!taken.get(nums[i] - k)) {
            taken.set(nums[i], (taken.get(nums[i]) || 0) + 1);
            total += count(i + 1);
            taken.set(nums[i], taken.get(nums[i]) - 1);
        }
        return total;
    };
    return count(0) - 1;
};
