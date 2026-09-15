func mergeStones(stones []int, k int) int {
	n := len(stones)
	// each merge replaces k piles with one (count drops by k-1), so
	// reaching a single pile requires (k-1) | (n-1)
	if (n-1)%(k-1) != 0 {
		return -1
	}
	const INF = int64(1) << 60
	prefix := make([]int64, n+1)
	for i, x := range stones {
		prefix[i+1] = prefix[i] + int64(x)
	}
	// dp[i][j][m] = min cost to compress stones[i..j] into exactly m piles
	dp := make([][][]int64, n)
	for i := range dp {
		dp[i] = make([][]int64, n)
		for j := range dp[i] {
			dp[i][j] = make([]int64, k+1)
			for m := range dp[i][j] {
				dp[i][j][m] = INF
			}
		}
	}
	// base: a single stone is already one pile at zero cost
	for i := 0; i < n; i++ {
		dp[i][i][1] = 0
	}
	// increasing length, so every subinterval is final before it is used
	for length := 2; length <= n; length++ {
		for i := 0; i+length-1 < n; i++ {
			j := i + length - 1
			// split: left part squeezed to one pile, right to m-1;
			// any m-pile configuration has such a first-pile split
			for m := 2; m <= k; m++ {
				for mid := i; mid < j; mid++ {
					if dp[i][mid][1] < INF && dp[mid+1][j][m-1] < INF {
						if cand := dp[i][mid][1] + dp[mid+1][j][m-1]; cand < dp[i][j][m] {
							dp[i][j][m] = cand
						}
					}
				}
			}
			// at k piles the interval merges into one pile for a cost
			// equal to its total stones (prefix sums answer in O(1))
			if dp[i][j][k] < INF {
				dp[i][j][1] = dp[i][j][k] + prefix[j+1] - prefix[i]
			}
		}
	}
	if dp[0][n-1][1] < INF {
		return int(dp[0][n-1][1])
	}
	return -1
}
