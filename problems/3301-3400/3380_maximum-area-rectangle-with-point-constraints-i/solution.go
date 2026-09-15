func maxRectangleArea(points [][]int) int {
	// Enumerate every quadruple. Four distinct points are the corners of an
	// axis-aligned rectangle exactly when they use two distinct x values
	// and two distinct y values — the four (x, y) combos then each hold one
	// of the points. The rectangle survives only if every other point lies
	// outside its closed box; with n <= 10 there are at most C(10,4) = 210
	// quads, each checked in a linear scan.
	n := len(points)
	best := -1
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			for k := j + 1; k < n; k++ {
				for l := k + 1; l < n; l++ {
					quad := [4][]int{points[i], points[j], points[k], points[l]}
					xs := map[int]bool{}
					ys := map[int]bool{}
					for _, p := range quad {
						xs[p[0]] = true
						ys[p[1]] = true
					}
					if len(xs) != 2 || len(ys) != 2 {
						continue
					}
					x1, x2 := min(quad[0][0], quad[1][0]), max(quad[0][0], quad[1][0])
					y1, y2 := min(quad[0][1], quad[1][1]), max(quad[0][1], quad[1][1])
					x1 = min(x1, min(quad[2][0], quad[3][0]))
					x2 = max(x2, max(quad[2][0], quad[3][0]))
					y1 = min(y1, min(quad[2][1], quad[3][1]))
					y2 = max(y2, max(quad[2][1], quad[3][1]))
					blocked := false
					for _, p := range points {
						isCorner := false
						for _, q := range quad {
							if p[0] == q[0] && p[1] == q[1] {
								isCorner = true
								break
							}
						}
						if isCorner {
							continue
						}
						if x1 <= p[0] && p[0] <= x2 && y1 <= p[1] && p[1] <= y2 {
							blocked = true
							break
						}
					}
					if !blocked {
						best = max(best, (x2-x1)*(y2-y1))
					}
				}
			}
		}
	}
	return best
}
