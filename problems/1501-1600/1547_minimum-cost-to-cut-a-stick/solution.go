import "sort"

func minCost(n int, cuts []int) int {
	positions := make([]int, 0, len(cuts)+2)
	positions = append(positions, cuts...)
	positions = append(positions, 0, n)
	// Sorting matters: the cutting order is free while the input order is
	// not, and the sentinel endpoints make the outermost segments uniform.
	sort.Ints(positions)
	size := len(positions)
	// dp[i][j]: minimum cost of all cuts strictly between boundaries i and
	// j; adjacent boundaries (no interior cut) stay 0.
	dp := make([][]int, size)
	for i := range dp {
		dp[i] = make([]int, size)
	}
	// Fill by increasing segment length so both subproblems of an interval
	// are already solved when it needs them.
	for length := 2; length < size; length++ {
		for i := 0; i+length < size; i++ {
			j := i + length
			best := int(^uint(0) >> 1) // MaxInt
			// Try every interior boundary as the first cut: it splits the
			// segment into independent subproblems and costs the segment's
			// full length.
			for k := i + 1; k < j; k++ {
				if dp[i][k]+dp[k][j] < best {
					best = dp[i][k] + dp[k][j]
				}
			}
			dp[i][j] = best + (positions[j] - positions[i])
		}
	}
	return dp[0][size-1]
}
