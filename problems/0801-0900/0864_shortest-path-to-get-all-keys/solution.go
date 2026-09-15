func shortestPathAllKeys(grid []string) int {
	m := len(grid)
	n := len(grid[0])
	sr, sc := -1, -1
	target := 0
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			ch := grid[i][j]
			if ch == '@' {
				sr, sc = i, j
			} else if ch >= 'a' && ch <= 'f' {
				target |= 1 << (ch - 'a')
			}
		}
	}
	size := 1 << 6
	dist := make([]int, m*n*size)
	for i := range dist {
		dist[i] = -1
	}
	type state struct{ r, c, mask int }
	queue := make([]state, 0, m*n*size)
	dist[(sr*n+sc)*size] = 0
	queue = append(queue, state{sr, sc, 0})
	dr := [4]int{1, -1, 0, 0}
	dc := [4]int{0, 0, 1, -1}
	for head := 0; head < len(queue); head++ {
		cur := queue[head]
		if cur.mask == target {
			return dist[(cur.r*n+cur.c)*size+cur.mask]
		}
		d := dist[(cur.r*n+cur.c)*size+cur.mask]
		for k := 0; k < 4; k++ {
			nr := cur.r + dr[k]
			nc := cur.c + dc[k]
			if nr < 0 || nr >= m || nc < 0 || nc >= n {
				continue
			}
			ch := grid[nr][nc]
			if ch == '#' {
				continue
			}
			if ch >= 'A' && ch <= 'F' && cur.mask&(1<<(ch-'A')) == 0 {
				continue
			}
			nmask := cur.mask
			if ch >= 'a' && ch <= 'f' {
				nmask |= 1 << (ch - 'a')
			}
			idx := (nr*n+nc)*size + nmask
			if dist[idx] == -1 {
				dist[idx] = d + 1
				queue = append(queue, state{nr, nc, nmask})
			}
		}
	}
	return -1
}
