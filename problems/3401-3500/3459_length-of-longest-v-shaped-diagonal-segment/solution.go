// Diagonal directions run in clockwise order NW, NE, SE, SW: a clockwise
// 90-degree turn maps index d to (d+1)%4. Past the head '1' the values
// alternate 2, 0, 2, 0, ..., so the other expected value of e in {0, 2} is
// 2 - e; table index j encodes e = 2*j.
func lenOfVDiagonal(grid [][]int) int {
	n, m := len(grid), len(grid[0])
	dr := [4]int{-1, -1, 1, 1}
	dc := [4]int{-1, 1, 1, -1}
	inB := func(r, c int) bool { return 0 <= r && r < n && 0 <= c && c < m }
	tables := func() [2][4][][]int {
		var t [2][4][][]int
		for j := range t {
			for d := range t[j] {
				t[j][d] = make([][]int, n)
				for r := range t[j][d] {
					t[j][d][r] = make([]int, m)
				}
			}
		}
		return t
	}
	// Straight tables: S[j][d] holds the longest run starting at each cell
	// going straight in direction d when the cell must equal 2*j.
	S := tables()
	for d := 0; d < 4; d++ {
		// Sweep rows against the direction so the next row is computed.
		for i := 0; i < n; i++ {
			r := i
			if dr[d] > 0 {
				r = n - 1 - i
			}
			for c := 0; c < m; c++ {
				for j := 0; j < 2; j++ {
					if grid[r][c] != 2*j {
						continue
					}
					nr, nc := r+dr[d], c+dc[d]
					nxt := 0
					if inB(nr, nc) {
						nxt = S[1-j][d][nr][nc]
					}
					S[j][d][r][c] = 1 + nxt
				}
			}
		}
	}
	// One-turn tables: continue straight in direction d, or make the single
	// clockwise turn and hand over to the straight tables of (d+1)%4.
	M := tables()
	for d := 0; d < 4; d++ {
		cw := (d + 1) % 4
		for i := 0; i < n; i++ {
			r := i
			if dr[d] > 0 {
				r = n - 1 - i
			}
			for c := 0; c < m; c++ {
				for j := 0; j < 2; j++ {
					if grid[r][c] != 2*j {
						continue
					}
					nr, nc := r+dr[d], c+dc[d]
					tr, tc := r+dr[cw], c+dc[cw]
					best := 0
					if inB(nr, nc) {
						best = M[1-j][d][nr][nc]
					}
					if inB(tr, tc) && S[1-j][cw][tr][tc] > best {
						best = S[1-j][cw][tr][tc]
					}
					M[j][d][r][c] = 1 + best
				}
			}
		}
	}
	// A head '1' plus the best one-turn run over its four first steps.
	ans := 0
	for r := 0; r < n; r++ {
		for c := 0; c < m; c++ {
			if grid[r][c] != 1 {
				continue
			}
			best := 0
			for d := 0; d < 4; d++ {
				nr, nc := r+dr[d], c+dc[d]
				if inB(nr, nc) && M[1][d][nr][nc] > best {
					best = M[1][d][nr][nc]
				}
			}
			if 1+best > ans {
				ans = 1 + best
			}
		}
	}
	return ans
}
