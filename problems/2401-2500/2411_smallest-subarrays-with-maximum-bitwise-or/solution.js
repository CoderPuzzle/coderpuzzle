/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallestSubarrays = function (nums) {
    // One pass per bit, right to left: `last` is the nearest index at or
    // after i whose number carries that bit. The OR of nums[i..j] is
    // maximal exactly when j reaches the farthest such index over all
    // bits of the suffix OR, so answer[i] is the largest gap.
    const n = nums.length;
    const answer = new Array(n).fill(1);
    for (let bit = 0; bit < 30; ++bit) {
        let last = -1;
        for (let i = n - 1; i >= 0; --i) {
            if ((nums[i] >> bit) & 1) {
                last = i;
            }
            if (last !== -1 && last - i + 1 > answer[i]) {
                answer[i] = last - i + 1;
            }
        }
    }
    return answer;
};
