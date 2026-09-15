function minSwaps(nums: number[]): number {
    const n = nums.length;
    const ones = nums.reduce((sum, value) => sum + value, 0);
    let windowOnes = 0;
    for (let index = 0; index < ones; index++) windowOnes += nums[index];
    let best = windowOnes;
    for (let start = 1; start < n; start++) {
        windowOnes -= nums[start - 1];
        windowOnes += nums[(start + ones - 1) % n];
        best = Math.max(best, windowOnes);
    }
    return ones - best;
}
