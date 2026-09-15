func sellingWood(m int, n int, prices [][]int) int64 {
	price := make([][]int64, m+1)
	for i := range price {
		price[i] = make([]int64, n+1)
	}
	// Dense price table: 0 where a shape is unsold, max on duplicates.
	for _, p := range prices {
		if price[p[0]][p[1]] < int64(p[2]) {
			price[p[0]][p[1]] = int64(p[2])
		}
	}
	// dp[i][j] = best revenue from an i x j piece: sell whole, or one
	// horizontal / vertical first cut with both halves solved
	// independently. Increasing i then j keeps every subproblem ready.
	dp := make([][]int64, m+1)
	for i := range dp {
		dp[i] = make([]int64, n+1)
	}
	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			// Selling whole is the default a cut must beat.
			best := price[i][j]
			row := dp[i]
			// Horizontal cuts: only up to the midpoint — the symmetric i-h
			// split need not be retried. Earlier rows are final.
			for h := 1; h <= i/2; h++ {
				v := dp[h][j] + dp[i-h][j]
				if v > best {
					best = v
				}
			}
			// Vertical cuts: earlier columns of the current row.
			for w := 1; w <= j/2; w++ {
				v := row[w] + row[j-w]
				if v > best {
					best = v
				}
			}
			dp[i][j] = best
		}
	}
	return dp[m][n]
}
