import "math"

func minTimeToVisitAllPoints(points [][]int) int {
	// Each second closes at most one unit of each axis (the diagonal), so
	// a leg takes exactly max(|dx|, |dy|) seconds — walk diagonally while
	// both gaps are open, then straight along what remains.
	total := 0
	for i := 1; i < len(points); i++ {
		dx := points[i][0] - points[i-1][0]
		dy := points[i][1] - points[i-1][1]
		if dx < 0 {
			dx = -dx
		}
		if dy < 0 {
			dy = -dy
		}
		if dx > dy {
			total += dx
		} else {
			total += dy
		}
	}
	return total
}
