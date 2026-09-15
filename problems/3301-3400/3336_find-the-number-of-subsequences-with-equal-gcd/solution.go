func subsequencePairCount(nums []int) int {
	const MOD = 1000000007
	gcd := func(a, b int) int {
		for b != 0 {
			a, b = b, a%b
		}
		return a
	}
	// dp[g1][g2] = ways to split the processed prefix into a sequence with
	// gcd g1 and a sequence with gcd g2 (gcd 0 denotes an empty sequence).
	maxVal := 200
	dp := make([][]int64, maxVal+1)
	ndp := make([][]int64, maxVal+1)
	for i := 0; i <= maxVal; i++ {
		dp[i] = make([]int64, maxVal+1)
		ndp[i] = make([]int64, maxVal+1)
	}
	dp[0][0] = 1
	for _, x := range nums {
		for g1 := 0; g1 <= maxVal; g1++ {
			copy(ndp[g1], dp[g1])
		}
		for g1 := 0; g1 <= maxVal; g1++ {
			row := dp[g1]
			for g2 := 0; g2 <= maxVal; g2++ {
				cur := row[g2]
				if cur == 0 {
					continue
				}
				ng1 := gcd(g1, x)
				ndp[ng1][g2] = (ndp[ng1][g2] + cur) % MOD
				ng2 := gcd(g2, x)
				ndp[g1][ng2] = (ndp[g1][ng2] + cur) % MOD
			}
		}
		dp, ndp = ndp, dp
	}

	var total int64
	for g := 1; g <= maxVal; g++ {
		total = (total + dp[g][g]) % MOD
	}
	return int(total)
}
