func constructGridLayout(n int, edges [][]int) [][]int {
	adj := make([][]int, n)
	for _, edge := range edges {
		adj[edge[0]] = append(adj[edge[0]], edge[1])
		adj[edge[1]] = append(adj[edge[1]], edge[0])
	}

	// 1 x C (or R x 1) input: the graph is a path with two degree-1 ends.
	endpoint := -1
	for v := 0; v < n && endpoint < 0; v++ {
		if len(adj[v]) == 1 {
			endpoint = v
		}
	}
	if endpoint >= 0 {
		placed := make([]bool, n)
		row := []int{endpoint}
		placed[endpoint] = true
		for {
			next := -1
			for _, u := range adj[row[len(row)-1]] {
				if !placed[u] {
					next = u
				}
			}
			if next < 0 {
				break
			}
			row = append(row, next)
			placed[next] = true
		}
		return [][]int{row}
	}

	// Both dimensions >= 2: corners are exactly the degree-2 nodes, and
	// edges = 2n - (rows + cols), so rows + cols is known from n and E.
	corner := -1
	for v := 0; v < n && corner < 0; v++ {
		if len(adj[v]) == 2 {
			corner = v
		}
	}
	dimsSum := 2*n - len(edges)
	rows, cols := 0, 0
	for t := 1; t < dimsSum; t++ {
		if t*(dimsSum-t) == n {
			rows, cols = t, dimsSum-t
			break
		}
	}
	for _, first := range adj[corner] {
		if grid, ok := gridBuild(adj, corner, first, rows, cols); ok {
			return grid
		}
	}
	return [][]int{}
}

func gridBuild(adj [][]int, corner int, first int, rows int, cols int) ([][]int, bool) {
	n := len(adj)
	placed := make([]bool, n)
	row0 := []int{corner, first}
	placed[corner] = true
	placed[first] = true
	for len(row0) < cols {
		w, p := row0[len(row0)-1], row0[len(row0)-2]
		next := -1
		for _, u := range adj[w] {
			if placed[u] || u == p {
				continue
			}
			if sharesNeighbor(adj, u, p, w) {
				continue
			}
			if next >= 0 {
				return nil, false
			}
			next = u
		}
		if next < 0 {
			return nil, false
		}
		row0 = append(row0, next)
		placed[next] = true
	}

	grid := [][]int{row0}
	for len(grid) < rows {
		prev := grid[len(grid)-1]
		row := make([]int, 0, cols)
		start := -1
		for _, u := range adj[prev[0]] {
			if !placed[u] {
				if start >= 0 {
					return nil, false
				}
				start = u
			}
		}
		if start < 0 {
			return nil, false
		}
		row = append(row, start)
		placed[start] = true
		for j := 1; j < cols; j++ {
			hit := -1
			for _, u := range adj[row[j-1]] {
				if placed[u] || !gridContains(adj[prev[j]], u) {
					continue
				}
				if hit >= 0 {
					return nil, false
				}
				hit = u
			}
			if hit < 0 {
				return nil, false
			}
			row = append(row, hit)
			placed[hit] = true
		}
		grid = append(grid, row)
	}
	for _, flag := range placed {
		if !flag {
			return nil, false
		}
	}
	return grid, true
}

func sharesNeighbor(adj [][]int, u int, p int, w int) bool {
	for _, z := range adj[u] {
		if z == w {
			continue
		}
		for _, x := range adj[p] {
			if z == x {
				return true
			}
		}
	}
	return false
}

func gridContains(list []int, value int) bool {
	for _, item := range list {
		if item == value {
			return true
		}
	}
	return false
}
