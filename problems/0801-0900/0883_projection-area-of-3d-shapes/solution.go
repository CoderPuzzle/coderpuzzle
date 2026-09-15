// The three projections never interact: the top view counts nonzero cells,
// the other two are silhouettes of row and column maxima. One row-major
// sweep banks the footprint and each row's tallest tower; a second sweep
// collects the column maxima.
func projectionArea(grid [][]int) int {
	n := len(grid)
	total := 0
	for _, row := range grid {
		tallest := 0
		for _, v := range row {
			if v != 0 {
				total++
			}
			if v > tallest {
				tallest = v
			}
		}
		total += tallest
	}
	for j := 0; j < n; j++ {
		tallest := 0
		for _, row := range grid {
			if row[j] > tallest {
				tallest = row[j]
			}
		}
		total += tallest
	}
	return total
}
