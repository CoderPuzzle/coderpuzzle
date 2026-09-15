import "sort"

func numberOfPairs(points [][]int) int {
	// Sorting by x ascending, y descending puts both ends of every valid
	// pair in a fixed order: each anchor's partners come strictly later in
	// the array.
	sort.Slice(points, func(i, j int) bool {
		if points[i][0] != points[j][0] {
			return points[i][0] < points[j][0]
		}
		return points[i][1] > points[j][1]
	})
	total := 0
	for i := range points {
		yi := points[i][1]
		// Every point already scanned between i and j has its x inside the
		// pair's span, so only the vertical window matters: best is the
		// largest y accepted so far, and yi >= yj > best holds exactly when
		// no other point lies in the closed rectangle — rejected points are
		// dominated by some accepted one, accepted points are themselves
		// inside it. Equal coordinates count as on-the-line pairs; the
		// border blocks everyone else.
		best := -1 // coordinates are >= 0, so -1 is below everything
		for j := i + 1; j < len(points); j++ {
			if yj := points[j][1]; yi >= yj && yj > best {
				total++
				best = yj
			}
		}
	}
	return total
}
