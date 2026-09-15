// Blow every square up into a 3x3 block and paint its wall as blocked
// pixels along the block's diagonal: '/' fills the anti-diagonal, '\' the
// main diagonal, a blank fills nothing. Corner contacts survive the
// upscale because the diagonals of two blocks meeting at a corner leave
// the pixels beside them open, so the regions are just the connected
// components of open pixels — an explicit-stack flood fill counts them.
func regionsBySlashes(grid []string) int {
	n := len(grid)
	size := 3 * n
	blocked := make([]bool, size*size)
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			switch grid[i][j] {
			case '/':
				blocked[(3*i)*size+3*j+2] = true
				blocked[(3*i+1)*size+3*j+1] = true
				blocked[(3*i+2)*size+3*j] = true
			case '\\':
				blocked[(3*i)*size+3*j] = true
				blocked[(3*i+1)*size+3*j+1] = true
				blocked[(3*i+2)*size+3*j+2] = true
			}
		}
	}
	// One flood fill per unvisited open pixel; each fill claims exactly one
	// region, so the number of fills is the answer.
	seen := make([]bool, size*size)
	stack := make([]int, 0, size*size)
	dr := [4]int{-1, 1, 0, 0}
	dc := [4]int{0, 0, -1, 1}
	regions := 0
	for r := 0; r < size; r++ {
		for c := 0; c < size; c++ {
			if blocked[r*size+c] || seen[r*size+c] {
				continue
			}
			regions++
			seen[r*size+c] = true
			stack = append(stack[:0], r*size+c)
			for len(stack) > 0 {
				cell := stack[len(stack)-1]
				stack = stack[:len(stack)-1]
				cr, cc := cell/size, cell%size
				for d := 0; d < 4; d++ {
					nr, nc := cr+dr[d], cc+dc[d]
					if nr >= 0 && nr < size && nc >= 0 && nc < size &&
						!blocked[nr*size+nc] && !seen[nr*size+nc] {
						seen[nr*size+nc] = true
						stack = append(stack, nr*size+nc)
					}
				}
			}
		}
	}
	return regions
}
