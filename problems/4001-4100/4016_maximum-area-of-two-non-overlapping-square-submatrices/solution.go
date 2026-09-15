// Binary search the largest feasible side; area is side squared.
func maxArea(mat [][]int) int {
	m, n := len(mat), len(mat[0])
	// prefix[i][j] = usable cells in mat[0..i)[0..j): any k-square's fill
	// is then four lookups, so "all ones" is an O(1) test.
	prefix := make([][]int, m+1)
	for i := range prefix {
		prefix[i] = make([]int, n+1)
	}
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			prefix[i+1][j+1] = prefix[i+1][j] + prefix[i][j+1] - prefix[i][j] + mat[i][j]
		}
	}
	hi := n
	if m < hi {
		hi = m
	}
	lo := 0
	for lo < hi {
		mid := (lo + hi + 1) / 2
		if hasDisjointPair(prefix, mid) {
			lo = mid
		} else {
			hi = mid - 1
		}
	}
	return lo * lo
}

// hasDisjointPair reports whether two disjoint all-ones k-squares exist.
// A disjoint pair exists iff the valid corners span >= k rows or >= k
// columns: extreme-row corners give disjoint row ranges, and if both spans
// are < k every pair of squares intersects. The same corner twice spans
// 0 < k, so it never counts as a pair.
func hasDisjointPair(prefix [][]int, k int) bool {
	m, n := len(prefix)-1, len(prefix[0])-1
	minRow, minCol := m+n, m+n
	maxRow, maxCol := -1, -1
	for r := 0; r+k <= m; r++ {
		for c := 0; c+k <= n; c++ {
			if prefix[r+k][c+k]-prefix[r][c+k]-prefix[r+k][c]+prefix[r][c] == k*k {
				if r < minRow {
					minRow = r
				}
				if r > maxRow {
					maxRow = r
				}
				if c < minCol {
					minCol = c
				}
				if c > maxCol {
					maxCol = c
				}
			}
		}
	}
	if maxRow < 0 {
		return false
	}
	return maxRow-minRow >= k || maxCol-minCol >= k
}
