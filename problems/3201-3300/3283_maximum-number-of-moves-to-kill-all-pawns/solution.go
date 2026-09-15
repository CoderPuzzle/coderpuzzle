func maxMoves(kx int, ky int, positions [][]int) int {
	moves := [8][2]int{
		{-2, -1}, {-2, 1}, {-1, -2}, {-1, 2},
		{1, -2}, {1, 2}, {2, -1}, {2, 1},
	}

	// BFS: minimum knight moves from (sx, sy) to every square.
	knightDistances := func(sx, sy int) [][]int {
		dist := make([][]int, 50)
		for i := range dist {
			dist[i] = make([]int, 50)
			for j := range dist[i] {
				dist[i][j] = -1
			}
		}
		dist[sx][sy] = 0
		queue := [][2]int{{sx, sy}}
		for head := 0; head < len(queue); head++ {
			x, y := queue[head][0], queue[head][1]
			d := dist[x][y]
			for _, mv := range moves {
				nx, ny := x+mv[0], y+mv[1]
				if nx >= 0 && nx < 50 && ny >= 0 && ny < 50 && dist[nx][ny] < 0 {
					dist[nx][ny] = d + 1
					queue = append(queue, [2]int{nx, ny})
				}
			}
		}
		return dist
	}

	m := len(positions)
	grids := make([][][]int, m)
	for i, p := range positions {
		grids[i] = knightDistances(p[0], p[1])
	}
	dStart := make([]int, m)
	dist := make([][]int, m)
	for i := 0; i < m; i++ {
		dStart[i] = grids[i][kx][ky]
		dist[i] = make([]int, m)
		for j := 0; j < m; j++ {
			dist[i][j] = grids[j][positions[i][0]][positions[i][1]]
		}
	}

	full := (1 << m) - 1
	// dp[mask][last]: best total remaining moves with `mask` captured and the
	// knight on pawn `last`. Alice maximizes on even popcount.
	dp := make([][]int, full+1)
	for i := range dp {
		dp[i] = make([]int, m)
	}
	for mask := full - 1; mask >= 1; mask-- {
		bits := 0
		for b := 0; b < m; b++ {
			if mask&(1<<b) != 0 {
				bits++
			}
		}
		maximize := bits%2 == 0
		for last := 0; last < m; last++ {
			best := -1
			if !maximize {
				best = int(^uint(0) >> 1) // max int
			}
			for j := 0; j < m; j++ {
				if mask&(1<<j) != 0 {
					continue
				}
				cand := dist[last][j] + dp[mask|(1<<j)][j]
				if maximize {
					if cand > best {
						best = cand
					}
				} else {
					if cand < best {
						best = cand
					}
				}
			}
			dp[mask][last] = best
		}
	}

	best := -1
	for j := 0; j < m; j++ {
		cand := dStart[j] + dp[1<<j][j]
		if cand > best {
			best = cand
		}
	}
	return best
}
