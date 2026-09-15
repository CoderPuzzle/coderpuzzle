/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} p
 * @return {number}
 */
var countDistinct = function (nums, k, p) {
    // dedup by content: the comma-joined string identifies a subarray
    const seen = new Set();
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        // for each left endpoint i, extend j, tracking the running count of
        // elements divisible by p
        let divisible = 0;
        let cur = "";
        for (let j = i; j < n; j++) {
            if (nums[j] % p === 0) divisible += 1;
            // the separator keeps [1,2] and [12] distinct
            cur = cur.length ? cur + "," + nums[j] : String(nums[j]);
            // over the limit: any longer extension stays over, so stop extending
            if (divisible > k) break;
            seen.add(cur);
        }
    }
    return seen.size;
};
