// The transpose swaps indices: the entry at (i, j) moves to (j, i), so
// every input row reappears as an output column. A non-square input
// changes shape — m x n becomes n x m — so the result is a fresh grid,
// never an in-place rewrite.
func transpose(matrix [][]int) [][]int {
	m, n := len(matrix), len(matrix[0])
	result := make([][]int, n)
	for j := range result {
		result[j] = make([]int, m)
	}
	for i, row := range matrix {
		for j, v := range row {
			result[j][i] = v
		}
	}
	return result
}
