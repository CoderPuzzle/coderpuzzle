// Each column holds at least one non-negative value, so the plain column
// maximum is never the -1 sentinel itself and is exactly what every -1 of
// that column should become.
func modifiedMatrix(matrix [][]int) [][]int {
	m, n := len(matrix), len(matrix[0])
	answer := make([][]int, m)
	for i := range answer {
		answer[i] = make([]int, n)
		copy(answer[i], matrix[i])
	}
	for j := 0; j < n; j++ {
		best := matrix[0][j]
		for i := 1; i < m; i++ {
			if matrix[i][j] > best {
				best = matrix[i][j]
			}
		}
		for i := 0; i < m; i++ {
			if answer[i][j] == -1 {
				answer[i][j] = best
			}
		}
	}
	return answer
}
