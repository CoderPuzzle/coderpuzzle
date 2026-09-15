func maximumSafenessFactor(grid [][]int) int {
	n := len(grid)
	// Multi-source BFS from every thief at once: wavefront exploration
	// makes dist[r][c] the minimum grid steps to the nearest thief —
	// exactly the cell's safeness value.
	dist := make([][]int, n)
	for i := range dist {
		dist[i] = make([]int, n)
		for j := range dist[i] {
			dist[i][j] = -1
		}
	}
	type cell struct{ r, c int }
	q := []cell{}
	for r := 0; r < n; r++ {
		for c := 0; c < n; c++ {
			if grid[r][c] == 1 {
				dist[r][c] = 0
				q = append(q, cell{r, c})
			}
		}
	}
	dr := [4]int{1, -1, 0, 0}
	dc := [4]int{0, 0, 1, -1}
	for head := 0; head < len(q); head++ {
		r, c := q[head].r, q[head].c
		for k := 0; k < 4; k++ {
			nr, nc := r+dr[k], c+dc[k]
			if nr >= 0 && nr < n && nc >= 0 && nc < n && dist[nr][nc] == -1 {
				dist[nr][nc] = dist[r][c] + 1
				q = append(q, cell{nr, nc})
			}
		}
	}

	reachable := func(threshold int) bool {
		// A path has factor >= threshold iff the corners stay connected
		// after deleting cells with dist < threshold; endpoints below it
		// fail immediately.
		if dist[0][0] < threshold || dist[n-1][n-1] < threshold {
			return false
		}
		seen := make([][]bool, n)
		for i := range seen {
			seen[i] = make([]bool, n)
		}
		seen[0][0] = true
		dq := []cell{{0, 0}}
		for head := 0; head < len(dq); head++ {
			r, c := dq[head].r, dq[head].c
			if r == n-1 && c == n-1 {
				return true
			}
			for k := 0; k < 4; k++ {
				nr, nc := r+dr[k], c+dc[k]
				if nr >= 0 && nr < n && nc >= 0 && nc < n && !seen[nr][nc] && dist[nr][nc] >= threshold {
					seen[nr][nc] = true
					dq = append(dq, cell{nr, nc})
				}
			}
		}
		return false
	}

	// Reachability is monotone in the threshold, so binary search the
	// largest feasible v over [0, 2n]. A thief on a corner pins its dist
	// to 0, capping the answer at 0.
	lo, hi, ans := 0, 2*n, 0
	for lo <= hi {
		mid := lo + (hi-lo)/2
		if reachable(mid) {
			ans = mid
			lo = mid + 1
		} else {
			hi = mid - 1
		}
	}
	return ans
}
