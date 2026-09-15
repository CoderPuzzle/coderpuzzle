function missingNumber(nums: number[]): number {
    const n = nums.length;
    // Sum what is actually present.
    let total = 0;
    for (const value of nums) {
        total += value;
    }
    // n distinct values from 0..n: the one absent value is the full-range
    // total n(n+1)/2 minus this sum; the product of consecutive n and n+1
    // is always even, so the division by 2 is exact.
    return (n * (n + 1)) / 2 - total;
}
