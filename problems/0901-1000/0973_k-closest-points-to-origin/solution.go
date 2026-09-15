import "sort"

func kClosest(points [][]int, k int) [][]int {
	pts := make([][]int, len(points))
	copy(pts, points)
	// Squared distance ranks points identically to the Euclidean
	// distance (sqrt is monotone) while staying integer-exact.
	sort.SliceStable(pts, func(a, b int) bool {
		return pts[a][0]*pts[a][0]+pts[a][1]*pts[a][1] < pts[b][0]*pts[b][0]+pts[b][1]*pts[b][1]
	})
	return pts[:k]
}
