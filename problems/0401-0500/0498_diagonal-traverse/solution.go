// Every anti-diagonal is the set of cells with i + j == d; walk the diagonals
// in increasing d and let d's parity pick the direction.
func findDiagonalOrder(mat [][]int) []int {
	m, n := len(mat), len(mat[0])
	order := make([]int, 0, m*n)
	for d := 0; d < m+n-1; d++ {
		// Rows on diagonal d: the column d - i stays in range exactly for i
		// between max(0, d-n+1) and min(d, m-1).
		low := max(0, d-n+1)
		high := min(d, m-1)
		if d%2 == 0 {
			// Even diagonal: read it upward, bottom row first.
			for i := high; i >= low; i-- {
				order = append(order, mat[i][d-i])
			}
		} else {
			// Odd diagonal: read it downward, top row first.
			for i := low; i <= high; i++ {
				order = append(order, mat[i][d-i])
			}
		}
	}
	return order
}
