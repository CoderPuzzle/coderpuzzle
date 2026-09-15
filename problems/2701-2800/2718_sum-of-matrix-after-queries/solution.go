func matrixSumQueries(n int, queries [][]int) int64 {
	// Sum reaches n*n*val = 1e13, past INT32_MAX; accumulate in 64-bit.
	seenRows := make([]bool, n)
	seenCols := make([]bool, n)
	remainingRows := n
	remainingCols := n
	var total int64
	for i := len(queries) - 1; i >= 0; i-- {
		kind := queries[i][0]
		index := queries[i][1]
		value := queries[i][2]
		if kind == 0 {
			if seenRows[index] {
				continue
			}
			seenRows[index] = true
			remainingRows--
			total += int64(value) * int64(remainingCols)
		} else {
			if seenCols[index] {
				continue
			}
			seenCols[index] = true
			remainingCols--
			total += int64(value) * int64(remainingRows)
		}
	}
	return total
}
