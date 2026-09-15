function alternatingSubarray(nums: number[]): number {
    // Track cur, the length of the alternating run ending at i. Its next
    // delta must be +1 when cur is odd and -1 when cur is even.
    let best = -1;
    let cur = 1;
    for (let i = 1; i < nums.length; ++i) {
        const need = cur % 2 === 1 ? 1 : -1;
        const delta = nums[i] - nums[i - 1];
        if (delta === need) {
            ++cur;
        } else if (delta === 1) {
            // A +1 pair is a fresh run starting at i - 1: restart there,
            // not at i, or [2,3,4,3,4] loses its second half.
            cur = 2;
        } else {
            cur = 1;
        }
        if (cur > 1) best = Math.max(best, cur);
    }
    return best;
}
