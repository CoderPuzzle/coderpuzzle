// A rectangle with sides parallel to the axes is pinned by two opposite
// corners: (x1, y1) and (x2, y2) with x1 != x2 and y1 != y2 close one
// exactly when (x1, y2) and (x2, y1) are also present, and its area is
// |x1 - x2| * |y1 - y2|. So every point goes into a set (a [2]int array
// serves as a comparable map key), every pair is tried as a candidate
// diagonal, and two O(1) lookups decide whether the rectangle exists.
func minAreaRect(points [][]int) int {
	seen := make(map[[2]int]bool, len(points))
	for _, point := range points {
		seen[[2]int{point[0], point[1]}] = true
	}
	best := 0
	for i, first := range points {
		x1, y1 := first[0], first[1]
		for _, second := range points[i+1:] {
			x2, y2 := second[0], second[1]
			if x1 == x2 || y1 == y2 {
				continue // a diagonal needs both coordinates to differ
			}
			if seen[[2]int{x1, y2}] && seen[[2]int{x2, y1}] {
				area := abs(x1-x2) * abs(y1-y2)
				if best == 0 || area < best {
					best = area
				}
			}
		}
	}
	return best
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
