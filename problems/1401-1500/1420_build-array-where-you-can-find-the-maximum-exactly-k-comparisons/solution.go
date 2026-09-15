func numOfArrays(n int, m int, k int) int {
	const MOD = 1000000007
	if k <= 0 || k > n || k > m {
		return 0
	}
	dp := make([][]int64, k+1)
	for c := range dp {
		dp[c] = make([]int64, m+1)
	}
	for j := 1; j <= m; j++ {
		dp[1][j] = 1
	}
	for step := 2; step <= n; step++ {
		ndp := make([][]int64, k+1)
		for c := range ndp {
			ndp[c] = make([]int64, m+1)
		}
		for c := 1; c <= k; c++ {
			prev := dp[c-1]
			pref := make([]int64, m+1)
			for j := 1; j <= m; j++ {
				pref[j] = (pref[j-1] + prev[j]) % MOD
			}
			cur := dp[c]
			row := ndp[c]
			for j := 1; j <= m; j++ {
				row[j] = (cur[j]*int64(j) + pref[j-1]) % MOD
			}
		}
		dp = ndp
	}
	var total int64
	for j := 1; j <= m; j++ {
		total = (total + dp[k][j]) % MOD
	}
	return int(total)
}
