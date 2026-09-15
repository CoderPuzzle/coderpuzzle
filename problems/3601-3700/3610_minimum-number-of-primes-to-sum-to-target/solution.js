/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var minNumberOfPrimes = function (n, m) {
    // Unbounded knapsack over the first m primes: dp[i] = fewest primes
    // whose sum is exactly i. Only primes <= n can ever contribute.
    const primes = [];
    for (let value = 2; primes.length < m; ++value) {
        if (primes.every((p) => value % p !== 0)) primes.push(value);
    }
    const inf = n + 1;
    const dp = new Array(n + 1).fill(inf);
    dp[0] = 0;
    for (let total = 1; total <= n; ++total) {
        for (const p of primes) {
            if (p <= total && dp[total - p] + 1 < dp[total]) {
                dp[total] = dp[total - p] + 1;
            }
        }
    }
    return dp[n] === inf ? -1 : dp[n];
};
