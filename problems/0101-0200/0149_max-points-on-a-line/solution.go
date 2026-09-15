// Anchor each point in turn and bucket every later point by the direction
// from the anchor: on any one line through the anchor all other members
// share that direction, and the best line is counted in full when the
// anchor is its earliest point.
func maxPoints(points [][]int) int {
	best := 1
	for i, anchor := range points {
		counts := map[[2]int]int{}
		for _, other := range points[i+1:] {
			dx, dy := other[0]-anchor[0], other[1]-anchor[1]
			// Reduce to lowest terms, then canonicalize the sign so the
			// two readings of one line collapse onto a single key:
			// exact integers, never a floating-point slope.
			g := gcd(dx, dy)
			dx, dy = dx/g, dy/g
			if dx < 0 || (dx == 0 && dy < 0) {
				dx, dy = -dx, -dy
			}
			counts[[2]int{dx, dy}]++
		}
		for _, count := range counts {
			if best < count+1 {
				best = count + 1
			}
		}
	}
	return best
}

// Euclid's algorithm on absolute values, so it also reduces directions
// that point down or left.
func gcd(a, b int) int {
	if a < 0 {
		a = -a
	}
	if b < 0 {
		b = -b
	}
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
