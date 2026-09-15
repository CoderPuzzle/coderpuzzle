func numberOfPermutations(n int, requirements [][]int) int {
	const MOD = 1000000007
	// reqMap[end] = required inversion count (last entry wins on duplicates).
	reqMap := make([]int64, n)
	for i := range reqMap {
		reqMap[i] = -1
	}
	maxCnt := 0
	for _, r := range requirements {
		reqMap[r[0]] = int64(r[1])
		if r[1] > maxCnt {
			maxCnt = r[1]
		}
	}

	// dp[j] = number of permutations of length i with j inversions.
	// Growing length i -> i+1 adds between 0 and i new inversions.
	dp := make([]int64, maxCnt+1)
	ndp := make([]int64, maxCnt+1)
	prefix := make([]int64, maxCnt+2)
	dp[0] = 1
	for i := 1; i <= n; i++ {
		if i > 1 {
			var s int64
			for j := 0; j <= maxCnt; j++ {
				s = (s + dp[j]) % MOD
				prefix[j+1] = s
			}
			for j := 0; j <= maxCnt; j++ {
				lo := 0
				if j-(i-1) > lo {
					lo = j - (i - 1)
				}
				ndp[j] = (prefix[j+1] - prefix[lo] + MOD) % MOD
			}
			dp, ndp = ndp, dp
		}
		if i-1 < n && reqMap[i-1] >= 0 {
			c := int(reqMap[i-1])
			for j := 0; j <= maxCnt; j++ {
				if j != c {
					dp[j] = 0
				}
			}
		}
	}
	return int(dp[reqMap[n-1]] % MOD)
}
