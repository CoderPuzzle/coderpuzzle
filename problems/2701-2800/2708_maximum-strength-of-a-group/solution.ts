function maxStrength(nums: number[]): number {
    // Sorting gathers the negatives at the front. Zeros never help (any kept
    // product has magnitude >= 1), and negatives only pay off in even counts,
    // so multiply every nonzero element except — when the negative count is
    // odd — nums[neg - 1], the one closest to zero. If nothing survives, the
    // best group is the largest single element. The strongest product is
    // 9^13 ≈ 2.5e12 < 2^53, so every intermediate is exact in a double.
    nums.sort((a, b) => a - b);
    let neg = 0;
    for (const v of nums) {
        if (v < 0) ++neg;
    }
    const skip = neg % 2 === 1 ? neg - 1 : -1;
    let prod = 1;
    let kept = false;
    for (let i = 0; i < nums.length; ++i) {
        if (i === skip || nums[i] === 0) continue;
        prod *= nums[i];
        kept = true;
    }
    return kept ? prod : nums[nums.length - 1];
}
