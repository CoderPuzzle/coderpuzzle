// Two signatures of an exact cover, gathered in one pass: the piece areas
// must sum to the bounding rectangle's area, and every interior corner
// cancels, leaving exactly the bounding box's four corners.
func isRectangleCover(rectangles [][]int) bool {
	area := 0
	minX, minY := rectangles[0][0], rectangles[0][1]
	maxA, maxB := rectangles[0][2], rectangles[0][3]
	corners := make(map[[2]int]bool)
	for _, r := range rectangles {
		x, y, a, b := r[0], r[1], r[2], r[3]
		area += (a - x) * (b - y)
		minX, minY = min(minX, x), min(minY, y)
		maxA, maxB = max(maxA, a), max(maxB, b)
		// Toggle: add when absent, remove when present, so a corner shared
		// by 2 or 4 pieces vanishes instead of accumulating.
		for _, corner := range [4][2]int{{x, y}, {x, b}, {a, y}, {a, b}} {
			if corners[corner] {
				delete(corners, corner)
			} else {
				corners[corner] = true
			}
		}
	}
	return len(corners) == 4 &&
		corners[[2]int{minX, minY}] && corners[[2]int{minX, maxB}] &&
		corners[[2]int{maxA, minY}] && corners[[2]int{maxA, maxB}] &&
		area == (maxA-minX)*(maxB-minY)
}
