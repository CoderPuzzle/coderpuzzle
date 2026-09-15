/**
 * @param {number[]} nums
 * @return {number}
 */
var sumCounts = function (nums) {
    const n = nums.length;
    let ans = 0;
    // For each left end, grow the right end one element at a time; the
    // running distinct set only ever grows, so its size is the
    // distinct count of every prefix subarray nums[i..j].
    for (let i = 0; i < n; ++i) {
        const seen = new Set();
        for (let j = i; j < n; ++j) {
            seen.add(nums[j]);
            ans += seen.size * seen.size;
        }
    }
    return ans;
};
