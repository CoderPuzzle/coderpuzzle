// Hash every segment by its sign-fixed reduced slope, and within a
// slope by its line intercept: two segments sharing a slope but lying
// on different lines never share an endpoint and always span a convex
// quadrilateral, while same-line pairs are degenerate. Per slope the
// valid base-pairs are C(m,2) minus the same-line C(c,2) sums. A
// parallelogram has two parallel-side pairs and is therefore counted in
// two slope buckets; hashing segments by diagonal midpoint (excluding
// equal-slope pairs, i.e. collinear quadruples) counts each
// parallelogram exactly once, so one subtraction makes every convex
// quad with parallel sides count once. Bucket counts reach
// C(125000, 2) ~ 7.8e9, so int64 math is required.
func countTrapezoids(points [][]int) int64 {
	type slopeKey struct{ dy, dx int }
	type midKey struct{ x, y int }
	slopeLines := make(map[slopeKey]map[int]int)
	midSlopes := make(map[midKey]map[slopeKey]int)
	for i := 0; i < len(points); i++ {
		for j := i + 1; j < len(points); j++ {
			dx := points[j][0] - points[i][0]
			dy := points[j][1] - points[i][1]
			g := gcd(dx, dy)
			if g < 0 {
				g = -g
			}
			dx /= g
			dy /= g
			if dx < 0 || (dx == 0 && dy < 0) {
				dx, dy = -dx, -dy
			}
			key := slopeKey{dy, dx}
			lines := slopeLines[key]
			if lines == nil {
				lines = make(map[int]int)
				slopeLines[key] = lines
			}
			lines[dx*points[i][1]-dy*points[i][0]]++
			mid := midKey{points[i][0] + points[j][0], points[i][1] + points[j][1]}
			slopes := midSlopes[mid]
			if slopes == nil {
				slopes = make(map[slopeKey]int)
				midSlopes[mid] = slopes
			}
			slopes[key]++
		}
	}
	var total int64
	for _, lines := range slopeLines {
		m := 0
		for _, c := range lines {
			m += c
		}
		total += int64(m) * int64(m-1) / 2
		for _, c := range lines {
			total -= int64(c) * int64(c-1) / 2
		}
	}
	var parallelograms int64
	for _, slopes := range midSlopes {
		c := 0
		for _, s := range slopes {
			c += s
		}
		parallelograms += int64(c) * int64(c-1) / 2
		for _, s := range slopes {
			parallelograms -= int64(s) * int64(s-1) / 2
		}
	}
	return total - parallelograms
}

func gcd(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
