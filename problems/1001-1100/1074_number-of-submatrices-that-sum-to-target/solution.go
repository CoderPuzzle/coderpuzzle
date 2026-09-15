func numSubmatrixSumTarget(matrix [][]int, target int) int {
	rows := len(matrix)
	cols := len(matrix[0])

	vpref := make([][]int, rows+1)
	for r := range vpref {
		vpref[r] = make([]int, cols)
	}
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			vpref[r+1][c] = vpref[r][c] + matrix[r][c]
		}
	}

	count := 0
	for top := 0; top < rows; top++ {
		for bottom := top; bottom < rows; bottom++ {
			hist := make(map[int]int)
			hist[0] = 1
			running := 0
			for c := 0; c < cols; c++ {
				colSum := vpref[bottom+1][c] - vpref[top][c]
				running += colSum
				count += hist[running-target]
				hist[running]++
			}
		}
	}
	return count
}
