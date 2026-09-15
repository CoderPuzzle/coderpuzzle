func minCost(grid [][]int) int {
	// Every cell value is at most 1023 (10 bits), so any path XOR is in
	// 0..1023. reach[i][j][x] records whether a path ending at (i, j) can
	// achieve XOR x.
	m, n := len(grid), len(grid[0])
	reach := make([][][]bool, m)
	for i := range reach {
		reach[i] = make([][]bool, n)
		for j := range reach[i] {
			reach[i][j] = make([]bool, 1024)
		}
	}
	reach[0][0][grid[0][0]] = true
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if i == 0 && j == 0 {
				continue
			}
			v := grid[i][j]
			for x := 0; x < 1024; x++ {
				if (i > 0 && reach[i-1][j][x]) || (j > 0 && reach[i][j-1][x]) {
					reach[i][j][x^v] = true
				}
			}
		}
	}
	// The smallest reachable XOR at the bottom-right cell is the answer.
	for x := 0; x < 1024; x++ {
		if reach[m-1][n-1][x] {
			return x
		}
	}
	return -1
}
