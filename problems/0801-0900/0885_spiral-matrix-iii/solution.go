// The walk is a turtle: it runs east, south, west, north, east, ... in
// turn, and every second turn the straight runs grow by one step (1, 1,
// 2, 2, 3, 3, ...). A step that lands outside the grid is still taken —
// the spiral reaches the far cells only by leaving and re-entering — but
// only in-grid positions are recorded, and once rows * cols of them are,
// the whole grid is visited and the walk stops.
func spiralMatrixIII(rows int, cols int, rStart int, cStart int) [][]int {
	total := rows * cols
	order := make([][]int, 0, total)
	order = append(order, []int{rStart, cStart})
	directions := [4][2]int{{0, 1}, {1, 0}, {0, -1}, {-1, 0}} // E, S, W, N
	r, c := rStart, cStart
	d, step := 0, 1
	for len(order) < total {
		for side := 0; side < 2; side++ {
			for i := 0; i < step; i++ {
				r += directions[d][0]
				c += directions[d][1]
				if 0 <= r && r < rows && 0 <= c && c < cols {
					order = append(order, []int{r, c})
				}
			}
			d = (d + 1) % 4
		}
		step++
	}
	return order
}
