function maximumScore(nums: number[], multipliers: number[]): number {
    const m = multipliers.length;
    const n = nums.length;
    const NEG_INF = -Infinity;
    // Base: after all m operations no score remains — stage m is all 0.
    let prev: number[] = new Array(m + 1).fill(0);
    // State (i, l) is complete: l taken from the left forces r = i - l
    // from the right, so the remaining ends are nums[l] and
    // nums[n - 1 - r] and nothing else matters.
    for (let i = m - 1; i >= 0; i--) {
        // Slots with l > i are unreachable at this stage; -inf keeps them
        // from ever winning a max.
        const cur: number[] = new Array(m + 1).fill(NEG_INF);
        for (let l = 0; l <= i; l++) {
            const r = i - l;
            // prev holds stage i + 1: taking the left moves to
            // (i+1, l+1), taking the right to (i+1, l).
            const takeLeft = prev[l + 1] + multipliers[i] * nums[l];
            const takeRight = prev[l] + multipliers[i] * nums[n - 1 - r];
            cur[l] = takeLeft >= takeRight ? takeLeft : takeRight;
        }
        prev = cur;
    }
    // State (0, 0): no operations used, nothing taken from the left.
    return prev[0];
}
