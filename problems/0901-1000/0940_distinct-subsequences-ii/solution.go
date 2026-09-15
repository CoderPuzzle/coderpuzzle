func distinctSubseqII(s string) int {
	const MOD = 1000000007
	n := len(s)
	dp := make([]int64, n+1)
	// dp[i]: distinct subsequences of the first i chars, empty included.
	dp[0] = 1
	var last [26]int
	for i := range last {
		last[i] = -1
	}
	for i := 1; i <= n; i++ {
		c := int(s[i-1]) - 'a'
		// Appending c nominally doubles the count...
		dp[i] = dp[i-1] * 2 % MOD
		if last[c] >= 0 {
			// ...but on a repeat, subtract the strings already produced
			// when c was last appended: dp of the prefix before it.
			dp[i] = (dp[i] - dp[last[c]] + MOD) % MOD
		}
		last[c] = i - 1
	}
	// Drop the empty subsequence (+MOD repairs the wrapped subtraction).
	return int((dp[n] - 1 + MOD) % MOD)
}
