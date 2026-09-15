function minSubArrayLen(target: number, nums: number[]): number {
    const n = nums.length;
    // Sentinel: an impossible length that survives when target is never met.
    let best = n + 1;
    let window = 0;
    let left = 0;
    for (let right = 0; right < n; right++) {
        window += nums[right];
        // Positive elements make the window sum monotone under both pointer
        // moves, so the smallest left end for each right only moves rightward
        // — both pointers make at most n steps.
        while (window >= target) {
            best = Math.min(best, right - left + 1);
            // Shrink from the left to reach the minimal window ending here
            // and leave the leanest state for the next extension.
            window -= nums[left];
            left++;
        }
    }
    return best === n + 1 ? 0 : best;
}
