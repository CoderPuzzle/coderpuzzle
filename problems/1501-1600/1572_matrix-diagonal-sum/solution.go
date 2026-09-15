func diagonalSum(mat [][]int) int {
	n := len(mat)
	total := 0
	for i := 0; i < n; i++ {
		total += mat[i][i]
		j := n - 1 - i
		// the two diagonals meet at the center of an odd-sized matrix;
		// only add the mirror cell when it is a different position
		if j != i {
			total += mat[i][j]
		}
	}
	return total
}
