// Each mirrored pair that disagrees costs exactly one flip; agreeing pairs
// and any middle cell never do.
func minFlips(grid [][]int) int {
	m, n := len(grid), len(grid[0])
	rows, cols := 0, 0
	for _, row := range grid {
		for lo, hi := 0, n-1; lo < hi; lo, hi = lo+1, hi-1 {
			if row[lo] != row[hi] {
				rows++
			}
		}
	}
	for j := 0; j < n; j++ {
		for lo, hi := 0, m-1; lo < hi; lo, hi = lo+1, hi-1 {
			if grid[lo][j] != grid[hi][j] {
				cols++
			}
		}
	}
	return min(rows, cols)
}
