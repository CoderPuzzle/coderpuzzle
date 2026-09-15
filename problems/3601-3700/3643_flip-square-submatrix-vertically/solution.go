// Two pointers walk inward from the square's top and bottom rows; each
// step exchanges the k columns the square spans. A middle row of an
// odd-sided square pairs with itself and needs no work.
func reverseSubmatrix(grid [][]int, x int, y int, k int) [][]int {
	top, bottom := x, x+k-1
	for top < bottom {
		for j := y; j < y+k; j++ {
			grid[top][j], grid[bottom][j] = grid[bottom][j], grid[top][j]
		}
		top++
		bottom--
	}
	return grid
}
