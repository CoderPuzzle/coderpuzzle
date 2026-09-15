func countSquares(matrix [][]int) int {
	m := len(matrix)
	n := len(matrix[0])
	total := 0
	// dp rows: side of the largest all-ones square whose bottom-right corner
	// sits at each cell; only the previous row is ever needed
	prev := make([]int, n)
	cur := make([]int, n)
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			cur[j] = 0
			// a 0 cell ends no square; entry stays 0
			if matrix[i][j] == 0 {
				continue
			}
			if i == 0 || j == 0 {
				// no room to extend past the matrix edge
				cur[j] = 1
			} else {
				// limited by the three neighbors: above, left, diagonal
				best := prev[j]
				if cur[j-1] < best {
					best = cur[j-1]
				}
				if prev[j-1] < best {
					best = prev[j-1]
				}
				cur[j] = best + 1
			}
			// a corner of max side k covers all k nested squares ending
			// there, so summing dp values counts every square exactly once
			total += cur[j]
		}
		prev, cur = cur, prev
	}
	return total
}
