function sumOfSquares(nums: number[]): number {
    // An element is special exactly when its position divides the length:
    // walk positions 1..n, test n % i == 0, and square the survivors in.
    // Position i lives at subscript i - 1 under 0-based indexing.
    const n = nums.length;
    let total = 0;
    for (let i = 1; i <= n; ++i) {
        if (n % i === 0) total += nums[i - 1] * nums[i - 1];
    }
    return total;
}
