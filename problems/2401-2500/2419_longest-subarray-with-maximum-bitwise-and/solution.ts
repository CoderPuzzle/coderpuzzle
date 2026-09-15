function longestSubarray(nums: number[]): number {
    // AND never exceeds any member, so the maximum subarray AND is
    // max(nums), and only subarrays made entirely of that value attain
    // it: adding anything smaller strictly lowers the AND. The answer
    // is therefore the longest run of consecutive occurrences of the
    // maximum.
    // A loop instead of Math.max(...nums): spreading 10^5 arguments
    // overflows the call stack.
    let target = nums[0];
    for (const num of nums) {
        if (num > target) target = num;
    }
    let best = 0;
    let run = 0;
    for (const num of nums) {
        if (num === target) {
            best = Math.max(best, ++run);
        } else {
            run = 0;
        }
    }
    return best;
}
