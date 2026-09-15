function maxAdjacentDistance(nums: number[]): number {
    // One pass over the n circular edges: pair i with (i + 1) % n, so the
    // last iteration compares the last and first elements. Differences
    // reach 200, tiny next to 2^53.
    let ans = 0;
    for (let i = 0; i < nums.length; i++) {
        const d = Math.abs(nums[i] - nums[(i + 1) % nums.length]);
        if (d > ans) {
            ans = d;
        }
    }
    return ans;
}
