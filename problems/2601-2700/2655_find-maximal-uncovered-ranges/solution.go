import "sort"

// n can be 10^9, so nothing may touch cells directly. Sorting by start
// and sweeping a cursor turns every stretch the cursor skips over into
// one maximal uncovered range: a gap is emitted whenever the next sorted
// range begins beyond the cursor, and the cursor then jumps past that
// range's end (overlaps merge implicitly).
func findMaximalUncoveredRanges(n int, ranges [][]int) [][]int {
	rs := make([][]int, len(ranges))
	copy(rs, ranges)
	sort.Slice(rs, func(i, j int) bool { return rs[i][0] < rs[j][0] })
	res := [][]int{}
	cur := 0
	for _, r := range rs {
		s, e := r[0], r[1]
		if s > cur {
			// Cells [cur, s-1] meet no covering range.
			res = append(res, []int{cur, s - 1})
		}
		if e+1 > cur {
			cur = e + 1
		}
	}
	if cur < n {
		res = append(res, []int{cur, n - 1})
	}
	return res
}
