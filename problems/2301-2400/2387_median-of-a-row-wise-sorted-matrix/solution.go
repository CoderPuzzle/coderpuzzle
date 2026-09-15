import "sort"

func matrixMedian(grid [][]int) int {
	m, n := len(grid), len(grid[0])
	// Odd element count, so the median is the m*n/2+1-th smallest value
	// — an actual matrix entry, returned exactly.
	need := m*n/2 + 1
	// Binary-search the value itself between the smallest row head and
	// the largest row tail.
	lo, hi := grid[0][0], grid[0][n-1]
	for _, row := range grid {
		if row[0] < lo {
			lo = row[0]
		}
		if row[n-1] > hi {
			hi = row[n-1]
		}
	}
	countLe := func(x int) int {
		// Each row is sorted, so the insertion point of x+1 counts its
		// <=x entries in O(log n); row counts add up across the matrix.
		total := 0
		for _, row := range grid {
			total += sort.SearchInts(row, x+1)
		}
		return total
	}
	// Find the smallest x with countLe(x) >= need. It must occur in
	// the matrix, else the counts at x and x-1 would be equal.
	for lo < hi {
		mid := lo + (hi-lo)/2
		if countLe(mid) >= need {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}
