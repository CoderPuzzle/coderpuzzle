// A convex polygon turns the same way at every vertex: the cross product of
// the incoming and outgoing edge vectors is positive at every left turn or
// negative at every right turn, so one sign of each anywhere is a refutation.
func isConvex(points [][]int) bool {
	n := len(points)
	positive, negative := false, false
	for i := range points {
		prev := points[(i-1+n)%n]
		cur := points[i]
		next := points[(i+1)%n]
		x1 := cur[0] - prev[0]
		y1 := cur[1] - prev[1]
		x2 := next[0] - cur[0]
		y2 := next[1] - cur[1]
		// z == 0 means three consecutive vertices are collinear — legal
		// along an edge, so it votes for neither side.
		z := int64(x1)*int64(y2) - int64(y1)*int64(x2)
		if z > 0 {
			positive = true
		} else if z < 0 {
			negative = true
		}
		if positive && negative {
			return false
		}
	}
	return true
}
