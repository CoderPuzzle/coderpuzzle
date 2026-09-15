// Reflection swaps the extreme columns, so the only axis that can work is
// x = (min_x + max_x) / 2: pin the sum s = min_x + max_x.
func isReflected(points [][]int) bool {
	minX, maxX := points[0][0], points[0][0]
	seen := make(map[[2]int]bool, len(points))
	for _, point := range points {
		if point[0] < minX {
			minX = point[0]
		}
		if point[0] > maxX {
			maxX = point[0]
		}
		seen[[2]int{point[0], point[1]}] = true
	}
	// The axis may fall between columns, so mirror with the integer sum:
	// every point needs its partner (s - x, y) in the set, where repeated
	// points simply collapse.
	s := minX + maxX
	for _, point := range points {
		if !seen[[2]int{s - point[0], point[1]}] {
			return false
		}
	}
	return true
}
