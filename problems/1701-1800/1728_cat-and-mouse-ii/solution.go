// Nothing about a position matters except the two cells and whose turn it
// is — at most 64*64*2 = 8192 states, so label every state outright: mouse
// on food is a Mouse win; cat on food or on the mouse is a Cat win. Then
// work backward with degree counting — a state whose mover can jump into a
// state already won by that mover inherits the win, and any other labeled
// successor retires one of its moves, so a state whose last move dies is
// the opponent's. States never labeled are draws the mouse survives forever
// without eating, which the 1000-turn rule awards to Cat. Per-cell jump
// lists (slide up to the limit, stop before the first wall, staying counts)
// drive both the labeling and its reverse edges.
func canMouseWin(grid []string, catJump int, mouseJump int) bool {
	rows, cols := len(grid), len(grid[0])
	idx := make([]int, rows*cols)
	for i := range idx {
		idx[i] = -1
	}
	n, mouse0, cat0, food := 0, 0, 0, 0
	for r, row := range grid {
		for c := 0; c < cols; c++ {
			ch := row[c]
			if ch != '#' {
				idx[r*cols+c] = n
				n++
				switch ch {
				case 'M':
					mouse0 = idx[r*cols+c]
				case 'C':
					cat0 = idx[r*cols+c]
				case 'F':
					food = idx[r*cols+c]
				}
			}
		}
	}
	mouseMoves := jumpLists(grid, rows, cols, idx, n, mouseJump)
	catMoves := jumpLists(grid, rows, cols, idx, n, catJump)
	mouseBack := reversed(mouseMoves, n)
	catBack := reversed(catMoves, n)
	const unknown, mouse, cat = 0, 1, 2
	label := make([]int, 2*n*n)
	degree := make([]int, 2*n*n)
	queue := make([]int, 0, 2*n*n)
	for m := 0; m < n; m++ {
		for c := 0; c < n; c++ {
			for t := 0; t < 2; t++ {
				s := (m*n+c)*2 + t
				if t == 0 {
					degree[s] = len(mouseMoves[m])
				} else {
					degree[s] = len(catMoves[c])
				}
				if c == food || m == c {
					label[s] = cat
					queue = append(queue, s)
				} else if m == food {
					label[s] = mouse
					queue = append(queue, s)
				}
			}
		}
	}
	for head := 0; head < len(queue); head++ {
		s := queue[head]
		base, t := s/2, s%2
		m, c := base/n, base%n
		win := label[s]
		if t == 1 {
			for _, m2 := range mouseBack[m] { // predecessors: the mouse just moved
				p := (m2*n + c) * 2
				if label[p] == unknown {
					if win == mouse {
						label[p] = mouse
						queue = append(queue, p)
					} else {
						degree[p]--
						if degree[p] == 0 {
							label[p] = cat
							queue = append(queue, p)
						}
					}
				}
			}
		} else {
			for _, c2 := range catBack[c] { // predecessors: the cat just moved
				p := (m*n+c2)*2 + 1
				if label[p] == unknown {
					if win == cat {
						label[p] = cat
						queue = append(queue, p)
					} else {
						degree[p]--
						if degree[p] == 0 {
							label[p] = mouse
							queue = append(queue, p)
						}
					}
				}
			}
		}
	}
	return label[(mouse0*n+cat0)*2] == mouse
}

func jumpLists(grid []string, rows, cols int, idx []int, n, jump int) [][]int {
	dr := [4]int{0, 0, 1, -1}
	dc := [4]int{1, -1, 0, 0}
	out := make([][]int, n)
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			i := idx[r*cols+c]
			if i < 0 {
				continue
			}
			out[i] = append(out[i], i) // staying in place is a move too
			for d := 0; d < 4; d++ {
				for s := 1; s <= jump; s++ {
					rr, cc := r+dr[d]*s, c+dc[d]*s
					if rr < 0 || rr >= rows || cc < 0 || cc >= cols || grid[rr][cc] == '#' {
						break
					}
					out[i] = append(out[i], idx[rr*cols+cc])
				}
			}
		}
	}
	return out
}

func reversed(moves [][]int, n int) [][]int {
	back := make([][]int, n)
	for i := 0; i < n; i++ {
		for _, j := range moves[i] {
			back[j] = append(back[j], i)
		}
	}
	return back
}
