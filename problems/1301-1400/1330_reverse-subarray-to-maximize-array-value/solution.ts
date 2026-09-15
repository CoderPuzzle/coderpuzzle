function maxValueAfterReverse(nums: number[]): number {
    // Reversing [L, R] only rewires the two boundary links. Gains split into:
    // prefix/suffix reversals (one boundary term each) and interior reversals,
    // bounded by 2*(max adjacent min - min adjacent max).
    const n = nums.length;
    let total = 0;
    for (let i = 0; i < n - 1; ++i) total += Math.abs(nums[i] - nums[i + 1]);
    let bestGain = 0;
    let big = -Infinity; // max over adjacent-pair minima
    let small = Infinity; // min over adjacent-pair maxima
    for (let i = 0; i < n - 1; ++i) {
        const a = nums[i];
        const b = nums[i + 1];
        bestGain = Math.max(bestGain, Math.abs(nums[0] - b) - Math.abs(a - b)); // reverse [0..i]
        bestGain = Math.max(bestGain, Math.abs(nums[n - 1] - a) - Math.abs(a - b)); // reverse [i+1..n-1]
        big = Math.max(big, Math.min(a, b));
        small = Math.min(small, Math.max(a, b));
    }
    if (big > small) bestGain = Math.max(bestGain, 2 * (big - small));
    return total + bestGain;
}
