/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function (nums, k) {
    // Bounds: (max-min) <= 10^9-1 and length <= 10^5, so every cost is
    // < 10^14 and k <= 10^15 — both far below 2^53, exact in JS doubles.
    // The answer is at most n(n+1)/2 ~ 5*10^9, also exact.
    const n = nums.length;
    const maxQ = []; // indices of max candidates, values decreasing
    const minQ = []; // indices of min candidates, values increasing
    let maxHead = 0;
    let minHead = 0;
    let ans = 0;
    let left = 0;
    for (let right = 0; right < n; right++) {
        const x = nums[right];
        while (maxQ.length > maxHead && nums[maxQ[maxQ.length - 1]] <= x) {
            maxQ.pop();
        }
        maxQ.push(right);
        while (minQ.length > minHead && nums[minQ[minQ.length - 1]] >= x) {
            minQ.pop();
        }
        minQ.push(right);
        // Growing the window only raises max, lowers min and lengthens the
        // window, so cost is non-decreasing in window size: shrink from the
        // left while invalid, then every subarray ending at right with left
        // endpoint >= left is valid — right-left+1 of them. A single element
        // costs 0 <= k, so the loop stops.
        while ((nums[maxQ[maxHead]] - nums[minQ[minHead]]) * (right - left + 1) > k) {
            if (maxQ[maxHead] === left) {
                maxHead++;
            }
            if (minQ[minHead] === left) {
                minHead++;
            }
            left++;
        }
        ans += right - left + 1;
    }
    return ans;
};
