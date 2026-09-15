function missingNumber(nums: number[]): number {
    // Seed with n — the one index the loop below never visits — then fold
    // every index 0..n-1 and every element into one accumulator.
    let result = nums.length;
    for (let i = 0; i < nums.length; i++) {
        // Each present value matches an index and cancels it; the absent
        // value pairs with nothing and survives the fold.
        result ^= i ^ nums[i];
    }
    return result;
}
