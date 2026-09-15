// Each rectangle independently caps a square at side min(l, w), so the
// answer is the largest of those minima and how many rectangles attain
// it: reset the count on a new maximum, increment it on a tie.
func countGoodRectangles(rectangles [][]int) int {
	bestSide := 0
	count := 0
	for _, rectangle := range rectangles {
		side := min(rectangle[0], rectangle[1])
		if side > bestSide {
			bestSide = side
			count = 1
		} else if side == bestSide {
			count++
		}
	}
	return count
}
