function minimizeArrayValue(nums: number[]): number {
    // Value only moves leftward, so each prefix's max is at least its
    // ceiling average; the max over all prefixes is also achievable by
    // balancing each prefix to that ceiling.
    let total = 0;
    let best = 0;
    for (let i = 0; i < nums.length; i++) {
        total += nums[i];
        // ceil(total / (i+1)) via integer arithmetic.
        const candidate = Math.floor((total + i) / (i + 1));
        if (candidate > best) {
            best = candidate;
        }
    }
    return best;
}
