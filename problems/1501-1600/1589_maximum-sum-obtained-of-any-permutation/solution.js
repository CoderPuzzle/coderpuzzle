/**
 * @param {number[]} nums
 * @param {number[][]} requests
 * @return {number}
 */
var maxSumRangeQuery = function (nums, requests) {
    const n = nums.length;
    const MOD = 1000000007n;
    // Difference array: +1 at the start of each request's range, -1 just
    // past its end; a prefix sum then turns this into per-index request
    // coverage counts instead of re-walking every request's range.
    const diff = new Array(n + 1).fill(0);
    for (const [start, end] of requests) {
        diff[start] += 1;
        diff[end + 1] -= 1;
    }
    const freq = new Array(n);
    let running = 0;
    for (let i = 0; i < n; ++i) {
        running += diff[i];
        freq[i] = running;
    }
    const sortedNums = [...nums].sort((a, b) => b - a);
    freq.sort((a, b) => b - a);
    // Rearrangement inequality: pairing the largest values with the largest
    // weights (both sorted descending) maximizes the sum of pairwise
    // products.
    let total = 0n;
    for (let i = 0; i < n; ++i) {
        total += BigInt(sortedNums[i]) * BigInt(freq[i]);
    }
    return Number(total % MOD);
};
