func validSubarraySplit(nums []int) int {
	// dp[i] = fewest subarrays to validly split nums[:i]; dp[0] = 0.
	// The last subarray ends at i - 1, so its start j must satisfy
	// gcd(nums[j], nums[i-1]) > 1, giving the transition dp[j] + 1.
	n := len(nums)
	inf := n + 1
	dp := make([]int, n+1)
	for i := range dp {
		dp[i] = inf
	}
	dp[0] = 0
	for i := 1; i <= n; i++ {
		for j := 0; j < i; j++ {
			if gcd(nums[j], nums[i-1]) > 1 && dp[j]+1 < dp[i] {
				dp[i] = dp[j] + 1
			}
		}
	}
	if dp[n] < inf {
		return dp[n]
	}
	return -1
}

func gcd(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
