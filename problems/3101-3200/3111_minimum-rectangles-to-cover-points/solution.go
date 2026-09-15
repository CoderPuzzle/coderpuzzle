import "sort"

func minRectanglesToCoverPoints(points [][]int, w int) int {
	// Height never matters -- a rectangle's top may rise arbitrarily, so
	// its reach is just the x-interval [start, start + w]. Sorting the x
	// coordinates reduces the task to packing them into the fewest
	// windows of width w: plant a window at the first uncovered point,
	// drop everything it reaches, repeat.
	xs := make([]int, 0, len(points))
	for _, p := range points {
		xs = append(xs, p[0])
	}
	sort.Ints(xs)
	count := 1
	anchor := xs[0]
	for _, x := range xs[1:] {
		if x-anchor > w {
			count++
			anchor = x
		}
	}
	return count
}
