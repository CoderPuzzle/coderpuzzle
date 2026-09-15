func beautifulPartitions(s string, k int, minLength int) int {
	const MOD = 1000000007
	isP := func(c byte) bool { return c == '2' || c == '3' || c == '5' || c == '7' }
	n := len(s)
	dp := make([][]int64, n+1)
	for i := range dp {
		dp[i] = make([]int64, k+1)
	}
	dp[0][0] = 1
	for j := 1; j <= k; j++ {
		prefix := make([]int64, n+1)
		for x := 0; x < n; x++ {
			prefix[x+1] = prefix[x]
			if isP(s[x]) {
				prefix[x+1] += dp[x][j-1]
			}
		}
		for i := 1; i <= n; i++ {
			if isP(s[i-1]) {
				continue
			}
			hi := i - minLength
			if hi >= 0 {
				dp[i][j] = prefix[hi+1] % MOD
			}
		}
	}
	return int(dp[n][k] % MOD)
}
