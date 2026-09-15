import "sort"

func luckyNumbers(matrix [][]int) []int {
	m := len(matrix)
	n := len(matrix[0])
	rowMin := make([]int, m)
	for r, row := range matrix {
		best := row[0]
		for _, v := range row {
			if v < best {
				best = v
			}
		}
		rowMin[r] = best
	}
	colMax := make([]int, n)
	for c := 0; c < n; c++ {
		best := matrix[0][c]
		for r := 1; r < m; r++ {
			if matrix[r][c] > best {
				best = matrix[r][c]
			}
		}
		colMax[c] = best
	}
	lucky := []int{}
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			if matrix[r][c] == rowMin[r] && matrix[r][c] == colMax[c] {
				lucky = append(lucky, matrix[r][c])
			}
		}
	}
	sort.Ints(lucky)
	return lucky
}
