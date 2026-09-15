// Each layer is peeled into a ring walked counter-clockwise from its top-left
// corner. Rotating the layer k times moves every element k steps along that
// walk, which is one right-rotation of the ring by k % ring_len; the ring is
// then written back along the same walk.
func rotateGrid(grid [][]int, k int) [][]int {
	m, n := len(grid), len(grid[0])
	out := make([][]int, m)
	for i := range out {
		out[i] = make([]int, n)
	}
	for l := 0; l < min(m, n)/2; l++ {
		top, left, bottom, right := l, l, m-1-l, n-1-l
		var pos [][2]int
		for r := top; r <= bottom; r++ {
			pos = append(pos, [2]int{r, left})
		}
		for c := left + 1; c <= right; c++ {
			pos = append(pos, [2]int{bottom, c})
		}
		for r := bottom - 1; r >= top; r-- {
			pos = append(pos, [2]int{r, right})
		}
		for c := right - 1; c > left; c-- {
			pos = append(pos, [2]int{top, c})
		}
		length := len(pos)
		s := k % length
		for i, to := range pos {
			from := pos[(i-s+length)%length]
			out[to[0]][to[1]] = grid[from[0]][from[1]]
		}
	}
	return out
}
