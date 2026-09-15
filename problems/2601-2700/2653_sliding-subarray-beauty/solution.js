/**
 * Values are bounded to [-50, 50], so only the 50 negative values can ever
 * be an answer: cnt[v + 50] counts copies of the negative value v inside
 * the current window. Each answer is found by walking those buckets
 * smallest value first until x negatives accumulate (0 when fewer than x).
 * @param {number[]} nums
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var getSubarrayBeauty = function (nums, k, x) {
    const cnt = new Array(50).fill(0);
    const res = [];
    for (let i = 0; i < nums.length; ++i) {
        const v = nums[i];
        if (v < 0) {
            ++cnt[v + 50];
        }
        const j = i - k;
        if (j >= 0 && nums[j] < 0) {
            --cnt[nums[j] + 50];
        }
        if (i >= k - 1) {
            // Walk the buckets smallest value first until x negatives
            // have been seen; fewer than x in total means beauty 0.
            let rem = x;
            let beauty = 0;
            for (let d = 0; d < 50 && rem > 0; ++d) {
                rem -= cnt[d];
                if (rem <= 0) beauty = d - 50;
            }
            res.push(beauty);
        }
    }
    return res;
};
