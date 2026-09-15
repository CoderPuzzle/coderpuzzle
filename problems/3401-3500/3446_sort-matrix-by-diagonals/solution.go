import "sort"

func sortMatrix(grid [][]int) [][]int {
	// Cells with i - j >= 0 form the bottom-left triangle together with
	// the middle diagonal (descending); i - j < 0 is the top-right
	// triangle (ascending). Visiting row-major keeps every diagonal's
	// values in top-left-to-bottom-right order, so one cursor per diagonal
	// pours them back in place.
	n := len(grid)
	diags := make([][]int, 2*n-1)
	for k := range diags {
		diags[k] = []int{}
	}
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			d := i - j + n - 1
			diags[d] = append(diags[d], grid[i][j])
		}
	}
	for k := range diags {
		if k >= n-1 {
			sort.Sort(sort.Reverse(sort.IntSlice(diags[k])))
		} else {
			sort.Ints(diags[k])
		}
	}
	pos := make([]int, 2*n-1)
	out := make([][]int, n)
	for i := range out {
		out[i] = make([]int, n)
		for j := 0; j < n; j++ {
			k := i - j + n - 1
			out[i][j] = diags[k][pos[k]]
			pos[k]++
		}
	}
	return out
}
