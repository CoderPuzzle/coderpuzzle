class Solution {
  public:
    // Unbounded knapsack over the first m primes: dp[i] = fewest primes
    // whose sum is exactly i. Only primes <= n can ever contribute.
    int minNumberOfPrimes(int n, int m) {
        vector<int> primes;
        for (int value = 2; (int)primes.size() < m; ++value) {
            bool isPrime = true;
            for (int p : primes) {
                if (value % p == 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime)
                primes.push_back(value);
        }
        int inf = n + 1;
        vector<int> dp(n + 1, inf);
        dp[0] = 0;
        for (int total = 1; total <= n; ++total) {
            for (int p : primes) {
                if (p <= total && dp[total - p] + 1 < dp[total]) {
                    dp[total] = dp[total - p] + 1;
                }
            }
        }
        return dp[n] == inf ? -1 : dp[n];
    }
};
