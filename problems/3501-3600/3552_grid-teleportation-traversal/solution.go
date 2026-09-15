func minMoves(matrix []string) int {
	// BFS in layers, where each layer holds every cell reachable with d
	// moves. Teleports cost 0, so each layer first runs its full closure:
	// the first cell of a letter seen in the layer claims every unvisited
	// cell of that letter. Only then are adjacent cells moved into the
	// next layer — a same-layer teleport must beat a move claimed earlier.
	m, n := len(matrix), len(matrix[0])
	total := m * n
	dist := make([]int, total)
	for i := range dist {
		dist[i] = -1
	}
	portals := make([][]int, 26)
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			if ch := matrix[r][c]; ch >= 'A' && ch <= 'Z' {
				portals[ch-'A'] = append(portals[ch-'A'], r*n+c)
			}
		}
	}
	var used [26]bool
	dist[0] = 0
	layer := []int{0}
	d := 0
	for len(layer) > 0 {
		for head := 0; head < len(layer); head++ {
			pos := layer[head]
			ch := matrix[pos/n][pos%n]
			if ch >= 'A' && ch <= 'Z' && !used[ch-'A'] {
				used[ch-'A'] = true
				for _, q := range portals[ch-'A'] {
					if dist[q] == -1 {
						dist[q] = d
						layer = append(layer, q)
					}
				}
			}
		}
		var nxt []int
		for _, pos := range layer {
			r, c := pos/n, pos%n
			if r > 0 && dist[pos-n] == -1 && matrix[r-1][c] != '#' {
				dist[pos-n] = d + 1
				nxt = append(nxt, pos-n)
			}
			if r+1 < m && dist[pos+n] == -1 && matrix[r+1][c] != '#' {
				dist[pos+n] = d + 1
				nxt = append(nxt, pos+n)
			}
			if c > 0 && dist[pos-1] == -1 && matrix[r][c-1] != '#' {
				dist[pos-1] = d + 1
				nxt = append(nxt, pos-1)
			}
			if c+1 < n && dist[pos+1] == -1 && matrix[r][c+1] != '#' {
				dist[pos+1] = d + 1
				nxt = append(nxt, pos+1)
			}
		}
		layer = nxt
		d++
	}
	return dist[total-1]
}
