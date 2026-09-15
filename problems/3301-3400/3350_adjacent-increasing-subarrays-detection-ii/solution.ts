function maxIncreasingSubarrays(nums: number[]): number {
    // Split nums into maximal strictly increasing runs. Two adjacent
    // k-windows either sit inside one run of length l (then k <= l / 2
    // floored) or meet exactly at a run boundary, one in each of two
    // consecutive runs (then k <= min of the two lengths). The answer is
    // the largest of those candidates over all boundaries.
    let best = 1;
    let prev = 0;
    let cur = 1;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            cur += 1;
        } else {
            best = Math.max(best, Math.min(prev, cur), Math.floor(cur / 2));
            prev = cur;
            cur = 1;
        }
    }
    return Math.max(best, Math.min(prev, cur), Math.floor(cur / 2));
}
