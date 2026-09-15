function subsetXORSum(nums: number[]): number {
    // Every bit set in any element appears in exactly half of the 2^n
    // subsets, so the answer is (OR of all elements) * 2^(n-1).
    let orAll = 0;
    for (const v of nums) {
        orAll |= v;
    }
    return orAll << (nums.length - 1);
}
