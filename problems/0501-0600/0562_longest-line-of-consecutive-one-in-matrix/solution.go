// Scan row by row; prev[j] holds the four run lengths that end at cell
// (i-1, j): horizontal, vertical, diagonal, anti-diagonal.
func longestLine(mat [][]int) int {
	m, n := len(mat), len(mat[0])
	prev := make([][4]int, n)
	best := 0
	for i := 0; i < m; i++ {
		cur := make([][4]int, n)
		for j := 0; j < n; j++ {
			if mat[i][j] == 1 {
				// Horizontal: extend the run arriving from the left.
				cur[j][0] = 1
				if j > 0 {
					cur[j][0] += cur[j-1][0]
				}
				// Vertical: extend the run arriving from above.
				cur[j][1] = prev[j][1] + 1
				// Diagonal: extend the run arriving from up-left.
				cur[j][2] = 1
				if j > 0 {
					cur[j][2] += prev[j-1][2]
				}
				// Anti-diagonal: extend the run arriving from up-right.
				cur[j][3] = 1
				if j+1 < n {
					cur[j][3] += prev[j+1][3]
				}
				best = max(best, cur[j][0], cur[j][1], cur[j][2], cur[j][3])
			}
		}
		prev = cur
	}
	return best
}
