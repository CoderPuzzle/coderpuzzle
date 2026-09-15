func ways(pizza []string, k int) int {
	const MOD = 1_000_000_007
	rows, cols := len(pizza), len(pizza[0])
	// apples[r][c] = apples in the rectangle (r, c)..(rows-1, cols-1).
	apples := make([][]int, rows+1)
	for r := range apples {
		apples[r] = make([]int, cols+1)
	}
	for r := rows - 1; r >= 0; r-- {
		for c := cols - 1; c >= 0; c-- {
			extra := 0
			if pizza[r][c] == 'A' {
				extra = 1
			}
			apples[r][c] = apples[r+1][c] + apples[r][c+1] - apples[r+1][c+1] + extra
		}
	}
	memo := make([][][]int64, rows)
	for r := range memo {
		memo[r] = make([][]int64, cols)
		for c := range memo[r] {
			memo[r][c] = make([]int64, k+1)
			for cut := range memo[r][c] {
				memo[r][c][cut] = -1
			}
		}
	}
	var count func(r, c, remaining int) int64
	count = func(r, c, remaining int) int64 {
		if apples[r][c] == 0 {
			return 0
		}
		if remaining == 0 {
			return 1
		}
		if memo[r][c][remaining] >= 0 {
			return memo[r][c][remaining]
		}
		var total int64
		// Horizontal cuts: hand away rows r..i-1, keep (i, c).
		for i := r + 1; i < rows; i++ {
			if apples[r][c]-apples[i][c] > 0 {
				total += count(i, c, remaining-1)
			}
		}
		// Vertical cuts: hand away columns c..j-1, keep (r, j).
		for j := c + 1; j < cols; j++ {
			if apples[r][c]-apples[r][j] > 0 {
				total += count(r, j, remaining-1)
			}
		}
		memo[r][c][remaining] = total % MOD
		return memo[r][c][remaining]
	}
	return int(count(0, 0, k-1))
}
