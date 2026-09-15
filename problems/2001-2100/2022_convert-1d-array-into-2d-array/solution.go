func construct2DArray(original []int, m int, n int) [][]int {
	if int64(m)*int64(n) != int64(len(original)) {
		return [][]int{}
	}

	result := make([][]int, m)
	for row := range result {
		result[row] = make([]int, n)
		for column := range result[row] {
			result[row][column] = original[row*n+column]
		}
	}
	return result
}
