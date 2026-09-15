// BFS over (cell, collected-litter mask, energy left), one layer per move.
// best[r * n + c][mask] keeps the largest energy that state was reached
// with; a new arrival is only worth keeping when it carries strictly more
// energy, because anything a weaker arrival can finish, a stronger one at
// the same or smaller depth finishes no later. An 'R' cell restores the
// tank on arrival, and the search returns the moment a move lands on the
// last uncollected litter.
func minMoves(classroom []string, energy int) int {
	m, n := len(classroom), len(classroom[0])
	bits := make([][]int, m)
	for r := range bits {
		bits[r] = make([]int, n)
		for c := range bits[r] {
			bits[r][c] = -1
		}
	}
	sr, sc, litter := 0, 0, 0
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			switch classroom[r][c] {
			case 'S':
				sr, sc = r, c
			case 'L':
				bits[r][c] = litter
				litter++
			}
		}
	}
	full := (1 << litter) - 1
	if full == 0 {
		return 0
	}
	stride := full + 1
	best := make([]int, m*n*stride)
	for i := range best {
		best[i] = -1
	}
	type state struct{ r, c, mask, e int }
	layer := []state{{sr, sc, 0, energy}}
	best[(sr*n+sc)*stride] = energy
	moves := 0
	for len(layer) > 0 {
		moves++
		var nxt []state
		for _, st := range layer {
			for _, d := range [4][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}} {
				nr, nc := st.r+d[0], st.c+d[1]
				if nr < 0 || nr >= m || nc < 0 || nc >= n || classroom[nr][nc] == 'X' {
					continue
				}
				ch := classroom[nr][nc]
				ne := st.e - 1
				if ch == 'R' {
					ne = energy
				} else if ne < 0 {
					continue // an empty tank only allows staying on an 'R'
				}
				nmask := st.mask
				if ch == 'L' {
					nmask |= 1 << bits[nr][nc]
				}
				if nmask == full {
					return moves
				}
				idx := (nr*n+nc)*stride + nmask
				if ne > best[idx] {
					best[idx] = ne
					nxt = append(nxt, state{nr, nc, nmask, ne})
				}
			}
		}
		layer = nxt
	}
	return -1
}
