// Scores grow with every extension: appending x to a window with sum s and
// length l changes the score by s + x*l + x > 0 (all elements are >= 1), so
// valid windows for a fixed right endpoint form a suffix that only shrinks
// as right advances. Sums reach 10^10 and scores 10^15 < 2^53, so every
// value here stays an exact double.
function countSubarrays(nums: number[], k: number): number {
    let total = 0;
    let windowSum = 0;
    let left = 0;
    for (let right = 0; right < nums.length; ++right) {
        windowSum += nums[right];
        while (windowSum * (right - left + 1) >= k) {
            windowSum -= nums[left];
            ++left;
        }
        // The window is now the longest qualifying subarray ending at
        // right; every shorter suffix qualifies too.
        total += right - left + 1;
    }
    return total;
}
