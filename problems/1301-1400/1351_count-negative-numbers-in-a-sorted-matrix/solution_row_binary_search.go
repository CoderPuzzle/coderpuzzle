func countNegatives(grid [][]int) int {
	// Every row is non-increasing, so its negatives are a suffix and the
	// first negative index is one bisection away in O(log n).
	n := len(grid[0])
	count := 0
	for _, row := range grid {
		lo, hi := 0, n
		for lo < hi {
			mid := (lo + hi) / 2
			if row[mid] < 0 {
				hi = mid
			} else {
				lo = mid + 1
			}
		}
		count += n - lo
	}
	return count
}
