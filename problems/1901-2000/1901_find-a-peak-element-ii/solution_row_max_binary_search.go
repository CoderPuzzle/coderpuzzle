func findPeakGrid(mat [][]int) []int {
	m, n := len(mat), len(mat[0])
	lo, hi := 0, m-1
	for lo <= hi {
		mid := (lo + hi) / 2
		row := mat[mid]
		// Row maximum: already beats its left/right neighbors, so only the
		// vertical direction can disqualify it.
		j := 0
		for c := 1; c < n; c++ {
			if row[c] > row[j] {
				j = c
			}
		}
		// -1 perimeter outside the grid stands in for out-of-range neighbors.
		up := -1
		if mid > 0 {
			up = mat[mid-1][j]
		}
		down := -1
		if mid < m-1 {
			down = mat[mid+1][j]
		}
		if row[j] > up && row[j] > down {
			return []int{mid, j}
		}
		// Recurse toward the larger vertical neighbor: that half's maximum is a
		// peak of the whole matrix, so the answer cannot be lost.
		if up > row[j] {
			hi = mid - 1
		} else {
			lo = mid + 1
		}
	}
	return []int{}
}
