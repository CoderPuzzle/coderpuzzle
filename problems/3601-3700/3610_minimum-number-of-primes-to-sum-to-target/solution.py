class Solution:
    def minNumberOfPrimes(self, n: int, m: int) -> int:
        # Unbounded knapsack over the first m primes: dp[i] = fewest primes
        # whose sum is exactly i. Only primes <= n can ever contribute.
        primes = []
        value = 2
        while len(primes) < m:
            if all(value % p for p in primes):
                primes.append(value)
            value += 1
        inf = n + 1
        dp = [inf] * (n + 1)
        dp[0] = 0
        for total in range(1, n + 1):
            for p in primes:
                if p <= total and dp[total - p] + 1 < dp[total]:
                    dp[total] = dp[total - p] + 1
        return -1 if dp[n] == inf else dp[n]
