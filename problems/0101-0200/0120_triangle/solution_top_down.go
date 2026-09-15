func minimumTotal(triangle [][]int) int {
	// Top-down mirror of the bottom-up DP: best[i] = minimum path sum from
	// the apex down to column i of the current row. Sums accumulate in
	// int64s for headroom.
	best := []int64{int64(triangle[0][0])}
	for _, row := range triangle[1:] {
		// A cell descends from column i-1 or i of the row above, so both
		// ragged edge cells have a single parent.
		nxt := make([]int64, len(row))
		nxt[0] = int64(row[0]) + best[0]
		for i := 1; i < len(row)-1; i++ {
			// The cheaper of the two parents above.
			parent := best[i-1]
			if best[i] < parent {
				parent = best[i]
			}
			nxt[i] = int64(row[i]) + parent
		}
		nxt[len(row)-1] = int64(row[len(row)-1]) + best[len(best)-1]
		best = nxt
	}
	// The answer is the cheapest cell on the final row.
	answer := best[0]
	for _, v := range best[1:] {
		if v < answer {
			answer = v
		}
	}
	return int(answer)
}
