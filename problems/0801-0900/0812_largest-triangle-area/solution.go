// Every triangle is three of the points, and at most C(50,3) = 19,600
// triples is few enough to enumerate them all: three nested loops over
// i < j < k keep the largest area. The area is half the absolute cross
// product of the edge vectors b - a and c - a, kept in exact integers
// until the single final division by 2 — a power of two, so the returned
// double is exact and a degenerate (collinear) triple simply contributes
// area 0.
func largestTriangleArea(points [][]int) float64 {
	n := len(points)
	best := 0.0
	for i := 0; i < n; i++ {
		ax, ay := points[i][0], points[i][1]
		for j := i + 1; j < n; j++ {
			ux, uy := points[j][0]-ax, points[j][1]-ay
			for k := j + 1; k < n; k++ {
				// The cross stays in an int64: exact for coordinates up
				// to 50 in magnitude, and never truncated to 32 bits.
				cross := int64(ux)*int64(points[k][1]-ay) - int64(uy)*int64(points[k][0]-ax)
				if cross < 0 {
					cross = -cross
				}
				area := float64(cross) / 2.0
				if area > best {
					best = area
				}
			}
		}
	}
	return best
}
