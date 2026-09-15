import (
	"math"
	"sort"
)

// x ascending, x-ties by y descending: every candidate lower-right corner
// of an upper-left anchor lives at a later index, and so does every
// potential blocker of such a pair.
func numberOfPairs(points [][]int) int {
	sort.Slice(points, func(i, j int) bool {
		if points[i][0] != points[j][0] {
			return points[i][0] < points[j][0]
		}
		return points[i][1] > points[j][1]
	})
	total := 0
	for i := range points {
		top := points[i][1]
		// Tallest y seen so far that does not exceed top; a candidate at
		// height y is valid exactly when window < y.
		window := math.MinInt
		for _, p := range points[i+1:] {
			y := p[1]
			if y > top {
				continue
			}
			if window < y {
				total++
			}
			if y > window {
				window = y
			}
		}
	}
	return total
}
