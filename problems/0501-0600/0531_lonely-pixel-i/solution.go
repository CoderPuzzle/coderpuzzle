// A pixel is lonely exactly when it is the only 'B' in its row and the only
// 'B' in its column. One pass tallies both totals per row and per column; a
// second pass checks each 'B' against them.
func findLonelyPixel(picture [][]string) int {
	m := len(picture)
	n := len(picture[0])
	rowCount := make([]int, m)
	colCount := make([]int, n)
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if picture[i][j] == "B" {
				rowCount[i]++
				colCount[j]++
			}
		}
	}
	lonely := 0
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if picture[i][j] == "B" && rowCount[i] == 1 && colCount[j] == 1 {
				lonely++
			}
		}
	}
	return lonely
}
