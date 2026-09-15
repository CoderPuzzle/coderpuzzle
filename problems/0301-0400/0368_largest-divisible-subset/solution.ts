function largestDivisibleSubset(nums: number[]): number[] {
    // Divisibility is transitive, so in ascending order each element
    // need only be divisible by the previous one — a longest-chain DP.
    const arr = nums.slice().sort((a, b) => a - b);
    const n = arr.length;
    if (n === 0) return [];
    // dp[i] = size of the largest divisible subset ending at arr[i];
    // parent links let the subset be rebuilt, not just counted.
    const dp: number[] = new Array(n).fill(1);
    const parent: number[] = new Array(n).fill(-1);
    let best = 0;
    for (let i = 0; i < n; i++) {
        // Every earlier divisor offers the extension dp[j] + 1.
        for (let j = 0; j < i; j++) {
            if (arr[i] % arr[j] === 0 && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                parent[i] = j;
            }
        }
        if (dp[i] > dp[best]) best = i;
    }
    // Trace parent links from the largest chain, reverse to ascending.
    const result: number[] = [];
    for (let i = best; i !== -1; i = parent[i]) result.push(arr[i]);
    result.reverse();
    return result;
}
