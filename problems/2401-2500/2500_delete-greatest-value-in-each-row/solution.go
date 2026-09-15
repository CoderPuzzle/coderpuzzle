import "sort"

func deleteGreatestValue(grid [][]int) int {
	// Sorting each row descending settles in one shot what every round
	// would delete from it: round k takes each row's k-th largest value.
	// The round's contribution is then just the max over rows of that
	// k-th largest -- no heap or marking simulation needed.
	for _, row := range grid {
		sort.Slice(row, func(a, b int) bool { return row[a] > row[b] })
	}
	answer := 0
	for j := 0; j < len(grid[0]); j++ {
		best := 0
		for i := 0; i < len(grid); i++ {
			if grid[i][j] > best {
				best = grid[i][j]
			}
		}
		answer += best
	}
	return answer
}
