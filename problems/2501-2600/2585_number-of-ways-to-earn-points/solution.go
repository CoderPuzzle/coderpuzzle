// Bounded knapsack over score: dp[p] counts ways to hit exactly p
// points with the types processed so far; each type opens a fresh row,
// so indistinguishable questions only contribute take-counts bounded by
// min(count, points/marks). Sums hold <= 51 residues below 10^9+7 --
// under 5.5e10, far inside int64 before the single reduction.
func waysToReachTarget(target int, types [][]int) int {
	const MOD = 1_000_000_007
	dp := make([]int64, target+1)
	dp[0] = 1
	for _, kind := range types {
		count, marks := kind[0], kind[1]
		nxt := make([]int64, target+1)
		for points := 0; points <= target; points++ {
			maxTake := count
			if limit := points / marks; limit < maxTake {
				maxTake = limit
			}
			var total int64
			for taken := 0; taken <= maxTake; taken++ {
				total += dp[points-taken*marks]
			}
			nxt[points] = total % MOD
		}
		dp = nxt
	}
	return int(dp[target])
}
