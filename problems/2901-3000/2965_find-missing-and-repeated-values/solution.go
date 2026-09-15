func findMissingAndRepeatedValues(grid [][]int) []int {
	// The grid holds [1, n*n] once each except one value twice and one
	// value never: flag each value in a seen array during one pass, and a
	// re-flagged value is the repeated a; the lone unflagged slot afterward
	// is the missing b.
	n := len(grid)
	seen := make([]bool, n*n+1)
	a := 0
	for _, row := range grid {
		for _, v := range row {
			if seen[v] {
				a = v
			}
			seen[v] = true
		}
	}
	b := 1
	for seen[b] {
		b++
	}
	return []int{a, b}
}
