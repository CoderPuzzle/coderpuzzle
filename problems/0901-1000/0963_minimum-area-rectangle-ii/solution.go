import "math"

// A quadrilateral is a rectangle exactly when its two diagonals bisect
// each other (shared midpoint) and have equal length: bisection makes it
// a parallelogram, and equal diagonals make a parallelogram rectangular.
// So every pair of points is hashed as a candidate diagonal, and a match
// hands over both diagonals of a rectangle whose four corners are all
// present. The doubled midpoint (x1 + x2, y1 + y2) — integral even when
// the true midpoint is half-integral — packs into one int64 key as
// (x1 + x2) * 80001 + (y1 + y2); the squared diagonal length rides along
// inside each bucket entry.
type diagEntry struct {
	x, y    int64
	length2 int64
}

func minAreaFreeRect(points [][]int) float64 {
	diagonals := make(map[int64][]diagEntry)
	best2 := int64(0)
	n := len(points)
	for i := 0; i < n; i++ {
		x1, y1 := int64(points[i][0]), int64(points[i][1])
		for j := i + 1; j < n; j++ {
			x2, y2 := int64(points[j][0]), int64(points[j][1])
			dx, dy := x1-x2, y1-y2
			center := (x1+x2)*80001 + (y1 + y2)
			length2 := dx*dx + dy*dy
			for _, stored := range diagonals[center] {
				if stored.length2 != length2 {
					continue // shared midpoint, different diagonal length
				}
				// The stored endpoint r marks one diagonal; its reflection
				// through the shared midpoint marks the other. The
				// rectangle's sides at (x1, y1) run to r and to that
				// reflection, whose offset is (x2 - rx, y2 - ry).
				ux, uy := stored.x-x1, stored.y-y1
				vx, vy := x2-stored.x, y2-stored.y
				area2 := (ux*ux + uy*uy) * (vx*vx + vy*vy)
				if best2 == 0 || area2 < best2 {
					best2 = area2
				}
			}
			diagonals[center] = append(diagonals[center], diagEntry{x1, y1, length2})
		}
	}
	// A lattice rectangle's area is always an integer — perpendicular
	// integer side vectors make the product of squared side lengths a
	// perfect square — and at most (4 * 10^4)^2 = 1.6 * 10^9, so the
	// squared area is an int64 of at most 2.56 * 10^18 whose root is
	// recovered exactly: a float64 rounds such a value by at most 256, the
	// square root then sits within 2 * 10^-7 of the integer area, and
	// math.Round snaps onto it.
	return math.Round(math.Sqrt(float64(best2)))
}
