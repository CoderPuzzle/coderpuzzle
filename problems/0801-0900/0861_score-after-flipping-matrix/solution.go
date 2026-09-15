// A leading 1 outweighs the rest of its row combined, so every row is
// flipped to a 1 head and contributes 2^(n-1) up front; after the head pass,
// cell (i, j) is 1 exactly where the row agreed with its own head, so a
// column toggle trades k for m - k.
func matrixScore(grid [][]int) int {
	m := len(grid)
	n := len(grid[0])
	score := m << (n - 1)
	for j := 1; j < n; j++ {
		agree := 0
		for _, row := range grid {
			if row[j] == row[0] {
				agree++
			}
		}
		best := agree
		if m-agree > best {
			best = m - agree
		}
		score += best << (n - 1 - j)
	}
	return score
}
