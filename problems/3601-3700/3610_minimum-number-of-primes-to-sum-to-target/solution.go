// Unbounded knapsack over the first m primes: dp[i] = fewest primes whose
// sum is exactly i. Only primes <= n can ever contribute.
func minNumberOfPrimes(n int, m int) int {
	primes := []int{}
	for value := 2; len(primes) < m; value++ {
		isPrime := true
		for _, p := range primes {
			if value%p == 0 {
				isPrime = false
				break
			}
		}
		if isPrime {
			primes = append(primes, value)
		}
	}
	inf := n + 1
	dp := make([]int, n+1)
	for i := range dp {
		dp[i] = inf
	}
	dp[0] = 0
	for total := 1; total <= n; total++ {
		for _, p := range primes {
			if p <= total && dp[total-p]+1 < dp[total] {
				dp[total] = dp[total-p] + 1
			}
		}
	}
	if dp[n] == inf {
		return -1
	}
	return dp[n]
}
