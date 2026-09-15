func countCells(grid [][]string, pattern string) int {
	m, n := len(grid), len(grid[0])
	total, length := m*n, len(pattern)
	want := []byte(pattern)

	// KMP failure function over the pattern.
	fail := make([]int, length)
	for i, k := 1, 0; i < length; i++ {
		for k > 0 && want[i] != want[k] {
			k = fail[k-1]
		}
		if want[i] == want[k] {
			k++
		}
		fail[i] = k
	}
	starts := func(text []byte) []int {
		var found []int
		for i, k := 0, 0; i < len(text); i++ {
			for k > 0 && text[i] != want[k] {
				k = fail[k-1]
			}
			if text[i] == want[k] {
				k++
			}
			if k == length {
				found = append(found, i-length+1)
				k = fail[k-1]
			}
		}
		return found
	}

	// Horizontal reads = row-major flatten; vertical reads = column-major.
	horizontal := make([]byte, 0, total)
	for _, row := range grid {
		for _, cell := range row {
			horizontal = append(horizontal, cell[0])
		}
	}
	vertical := make([]byte, 0, total)
	for c := 0; c < n; c++ {
		for r := 0; r < m; r++ {
			vertical = append(vertical, grid[r][c][0])
		}
	}

	// Difference arrays over the two flatten orders; a match covers
	// positions start .. start + length - 1 in its own flatten order.
	hmark := make([]int, total+1)
	vmark := make([]int, total+1)
	for _, start := range starts(horizontal) {
		hmark[start]++
		hmark[start+length]--
	}
	for _, start := range starts(vertical) {
		vmark[start]++
		vmark[start+length]--
	}
	for i := 0; i < total; i++ {
		hmark[i+1] += hmark[i]
		vmark[i+1] += vmark[i]
	}

	// A cell (r, c) sits at row-major position r*n+c and column-major
	// position c*m+r; it counts iff both marks cover it.
	covered := 0
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			if hmark[r*n+c] > 0 && vmark[c*m+r] > 0 {
				covered++
			}
		}
	}
	return covered
}
