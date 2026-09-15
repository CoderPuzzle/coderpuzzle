function maximumTotalCost(nums: number[]): number {
    // Splitting is only ever worth it to make a negative element flip
    // sign, and a subarray forces alternating signs from its head — so per
    // element there are two states: it keeps its phase-plus sign (free to
    // continue or restart after a worst-so-far prefix) or it rides in as
    // negated, which requires the previous element to have kept its sign.
    // The seeds are exactly hint dp[1][*]; two rolling variables carry the
    // table. Totals stay below sum |nums[i]| <= 10^14 < 2^53, so plain
    // numbers are exact.
    if (nums.length === 1) {
        return nums[0];
    }
    let keep = nums[0] + nums[1];
    let flip = nums[0] - nums[1];
    for (let i = 2; i < nums.length; ++i) {
        const nextKeep = Math.max(keep, flip) + nums[i];
        flip = keep - nums[i];
        keep = nextKeep;
    }
    return Math.max(keep, flip);
}
