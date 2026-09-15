import "sort"

func longestObstacleCourseAtEachPosition(obstacles []int) []int {
	// tails[j] = smallest possible tail of a non-decreasing subsequence of
	// length j+1 over the prefix so far; it stays sorted, so each obstacle
	// is placed by binary search.
	tails := make([]int, 0, len(obstacles))
	ans := make([]int, 0, len(obstacles))
	for _, x := range obstacles {
		// First strictly greater tail: an obstacle equal to a tail extends
		// that course instead of replacing it -- the only change vs strict
		// LIS.
		i := sort.Search(len(tails), func(i int) bool { return tails[i] > x })
		if i == len(tails) {
			tails = append(tails, x) // new longest course
		} else {
			tails[i] = x // keep the length-(i+1) tail minimal
		}
		// Insertion index + 1 = longest course ending with this obstacle.
		ans = append(ans, i+1)
	}
	return ans
}
