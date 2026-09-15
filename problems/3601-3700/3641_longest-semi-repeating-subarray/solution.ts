function longestSubarray(nums: number[], k: number): number {
    // freq counts occurrences of each value inside the window; dup counts
    // how many values have been seen twice or more.
    const freq = new Map<number, number>();
    let dup = 0,
        left = 0,
        best = 0;
    for (let right = 0; right < nums.length; right++) {
        const added = (freq.get(nums[right]) ?? 0) + 1;
        freq.set(nums[right], added);
        if (added === 2) {
            dup++;
        }
        // Grow past k repeating values and the window must give ground until
        // one of them is fully evicted again.
        while (dup > k) {
            const dropped = freq.get(nums[left]) - 1;
            freq.set(nums[left], dropped);
            if (dropped === 1) {
                dup--;
            }
            left++;
        }
        best = Math.max(best, right - left + 1);
    }
    return best;
}
