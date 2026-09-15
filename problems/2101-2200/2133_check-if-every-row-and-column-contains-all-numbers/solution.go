func checkValid(matrix [][]int) bool {
	size := len(matrix)
	for index := 0; index < size; index++ {
		rowSeen := make([]bool, size+1)
		colSeen := make([]bool, size+1)
		for offset := 0; offset < size; offset++ {
			rowValue := matrix[index][offset]
			colValue := matrix[offset][index]
			if rowSeen[rowValue] || colSeen[colValue] {
				return false
			}
			rowSeen[rowValue] = true
			colSeen[colValue] = true
		}
	}
	return true
}
