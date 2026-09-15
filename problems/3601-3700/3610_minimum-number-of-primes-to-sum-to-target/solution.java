import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    // Unbounded knapsack over the first m primes: dp[i] = fewest primes
    // whose sum is exactly i. Only primes <= n can ever contribute.
    public int minNumberOfPrimes(int n, int m) {
        List<Integer> primes = new ArrayList<>();
        for (int value = 2; primes.size() < m; ++value) {
            boolean isPrime = true;
            for (int p : primes) {
                if (value % p == 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) primes.add(value);
        }
        int inf = n + 1;
        int[] dp = new int[n + 1];
        Arrays.fill(dp, inf);
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
}
