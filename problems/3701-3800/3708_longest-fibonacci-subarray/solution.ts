function longestSubarray(nums: number[]): number {
    // One sweep carrying a run counter: any adjacent pair is a valid
    // Fibonacci array, so runs start at length 2; each later element
    // extends the run when it equals the sum of the two before it and
    // snaps the counter back to 2 when it does not.
    let best = 2;
    let current = 2;
    for (let i = 2; i < nums.length; ++i) {
        if (nums[i] === nums[i - 1] + nums[i - 2]) {
            ++current;
        } else {
            current = 2;
        }
        if (current > best) {
            best = current;
        }
    }
    return best;
}
