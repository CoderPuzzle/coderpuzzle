function countBadPairs(nums: number[]): number {
    // j - i != nums[j] - nums[i] rearranges to nums[j] - j !=
    // nums[i] - i: a pair is good exactly when the shifted values match.
    // Count good pairs per shifted value, subtract from all pairs; the
    // maximum pair count is 100000 * 99999 / 2 ≈ 5e9, far inside Number's
    // exact range.
    const counts = new Map<number, number>();
    let good = 0;
    for (let i = 0; i < nums.length; ++i) {
        const shifted = nums[i] - i;
        good += counts.get(shifted) || 0;
        counts.set(shifted, (counts.get(shifted) || 0) + 1);
    }
    const n = nums.length;
    return (n * (n - 1)) / 2 - good;
}
