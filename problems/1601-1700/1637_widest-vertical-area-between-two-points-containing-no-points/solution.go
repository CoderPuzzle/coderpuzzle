import "sort"

func maxWidthOfVerticalArea(points [][]int) int {
	xs := make([]int, len(points))
	for i, point := range points {
		xs[i] = point[0]
	}
	sort.Ints(xs)

	widest := 0
	for i := 1; i < len(xs); i++ {
		if gap := xs[i] - xs[i-1]; gap > widest {
			widest = gap
		}
	}
	return widest
}
