// Interval DP over prefix sums: dp[i][j] is the best score obtainable
// starting from the slice [i, j]; a single stone (i == j) ends the game
// with no more score, so the table is left at its zero default there.
func stoneGameV(stoneValue []int) int64 {
	n := len(stoneValue)
	// Prefix sums turn any slice's weight into an O(1) subtraction.
	prefix := make([]int64, n+1)
	for i := 0; i < n; i++ {
		prefix[i+1] = prefix[i] + int64(stoneValue[i])
	}

	dp := make([][]int64, n)
	for i := range dp {
		dp[i] = make([]int64, n)
	}
	for length := 2; length <= n; length++ {
		for i := 0; i+length-1 < n; i++ {
			j := i + length - 1
			var best int64 = 0
			for k := i; k < j; k++ {
				leftSum := prefix[k+1] - prefix[i]
				rightSum := prefix[j+1] - prefix[k+1]
				var candidate int64
				if leftSum < rightSum {
					candidate = leftSum + dp[i][k]
				} else if leftSum > rightSum {
					candidate = rightSum + dp[k+1][j]
				} else {
					// A tie lets Alice keep whichever half scores more later.
					candidate = leftSum + max64(dp[i][k], dp[k+1][j])
				}
				if candidate > best {
					best = candidate
				}
			}
			dp[i][j] = best
		}
	}
	return dp[0][n-1]
}

func max64(a, b int64) int64 {
	if a > b {
		return a
	}
	return b
}
