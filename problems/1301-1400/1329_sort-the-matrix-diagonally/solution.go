import "sort"

func diagonalSort(mat [][]int) [][]int {
	// Cells on one diagonal share i - j, so sort each diagonal from its
	// top-row / left-column start and write the values back along the walk.
	m, n := len(mat), len(mat[0])
	out := make([][]int, m)
	for i := range out {
		out[i] = make([]int, n)
	}
	scatter := func(si, sj int) {
		diag := []int{}
		for i, j := si, sj; i < m && j < n; i, j = i+1, j+1 {
			diag = append(diag, mat[i][j])
		}
		sort.Ints(diag)
		k := 0
		for i, j := si, sj; i < m && j < n; i, j = i+1, j+1 {
			out[i][j] = diag[k]
			k++
		}
	}
	for si := 0; si < m; si++ {
		scatter(si, 0)
	}
	for sj := 1; sj < n; sj++ {
		scatter(0, sj)
	}
	return out
}
