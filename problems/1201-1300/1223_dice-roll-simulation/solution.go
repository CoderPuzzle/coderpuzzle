func dieSimulator(n int, rollMax []int) int {
	const MOD = 1000000007
	// dp[j][c]: sequences of the current length ending with face j repeated
	// exactly c times (rollMax[i] <= 15, so 16 columns suffice)
	dp := make([][]int, 6)
	for j := range dp {
		dp[j] = make([]int, 16)
	}
	// base: one single-roll sequence per face
	for j := 0; j < 6; j++ {
		dp[j][1] = 1
	}
	for step := 2; step <= n; step++ {
		nxt := make([][]int, 6)
		for j := range nxt {
			nxt[j] = make([]int, 16)
		}
		// per-face totals and grand total, from the previous table
		totals := make([]int, 6)
		grand := 0
		for j := 0; j < 6; j++ {
			for c := 0; c < 16; c++ {
				totals[j] += dp[j][c]
			}
			grand += totals[j]
		}
		for j := 0; j < 6; j++ {
			limit := rollMax[j]
			// extending a run shifts counts up one column; never writing
			// past rollMax[j] is what keeps overlong runs impossible
			for c := 2; c <= limit; c++ {
				nxt[j][c] = dp[j][c-1]
			}
			// fresh run of face j: any sequence ending in a different face
			nxt[j][1] = ((grand-totals[j])%MOD + MOD) % MOD
		}
		dp = nxt
	}
	// each legal sequence lands in exactly one cell (final face, run len)
	answer := 0
	for j := 0; j < 6; j++ {
		for c := 0; c < 16; c++ {
			answer = (answer + dp[j][c]) % MOD
		}
	}
	return answer
}
