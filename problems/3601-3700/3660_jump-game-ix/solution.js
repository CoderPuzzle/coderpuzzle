/**
 * @param {number[]} nums
 * @return {number[]}
 */
var maxValue = function (nums) {
    const n = nums.length;
    // suf[i]: smallest value in nums[i..n-1]; Infinity past the end lets the
    // last index always close its segment.
    const suf = new Array(n + 1).fill(Infinity);
    for (let i = n - 1; i >= 0; i--) {
        suf[i] = Math.min(suf[i + 1], nums[i]);
    }
    // Grow the current segment while its prefix maximum strictly exceeds the
    // suffix minimum just past it: any such boundary is crossed by an
    // inverted pair, so the component cannot end there.
    const ans = [];
    let segMax = 0,
        run = 0;
    for (let i = 0; i < n; i++) {
        segMax = Math.max(segMax, nums[i]);
        run++;
        if (i === n - 1 || segMax <= suf[i + 1]) {
            // The segment is closed: every index inside it reaches the
            // segment maximum and nothing beyond it.
            for (let j = 0; j < run; j++) {
                ans.push(segMax);
            }
            segMax = 0;
            run = 0;
        }
    }
    return ans;
};
