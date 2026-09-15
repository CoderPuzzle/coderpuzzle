import "sort"

// Six pairs hide among four points — four sides and two diagonals.
// Grouping by squared length compares exactly what distances compare, so
// no square root ever gets the chance to round.
func validSquare(p1 []int, p2 []int, p3 []int, p4 []int) bool {
	points := [][]int{p1, p2, p3, p4}
	d2 := make([]int64, 0, 6)
	for i := 0; i < 4; i++ {
		for j := i + 1; j < 4; j++ {
			dx := int64(points[j][0] - points[i][0])
			dy := int64(points[j][1] - points[i][1])
			d2 = append(d2, dx*dx+dy*dy)
		}
	}
	sort.Slice(d2, func(a, b int) bool { return d2[a] < d2[b] })
	// Sorted, a square is exactly the multiset a, a, a, a, b, b: the four
	// equal sides come first and the two equal diagonals after, with a > 0
	// so a collapsed point cannot pose as a side.
	return d2[0] > 0 && d2[0] == d2[3] && d2[4] == d2[5] && d2[3] != d2[4]
}
