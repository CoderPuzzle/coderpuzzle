import "sort"

func maximumSafenessFactor(grid [][]int) int {
	n := len(grid)
	// Multi-source BFS from every hazard at once: wavefront exploration
	// makes dist[r][c] the minimum grid steps to the nearest hazard —
	// exactly the cell's clearance value.
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

	// Kruskal-style flood: admit cells in descending clearance, uniting each
	// with its already-admitted 4-neighbors, and watch the corners. Their
	// union traces a real all-admitted path, so it can only happen at a
	// clearance the answer reaches — and the best route's bottleneck cell
	// closes it exactly, making the value being admitted the answer.
	parent := make([]int, n*n)
	size := make([]int, n*n)
	for i := range parent {
		parent[i] = i
		size[i] = 1
	}
	find := func(x int) int {
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}
	cells := make([]cell, 0, n*n)
	for r := 0; r < n; r++ {
		for c := 0; c < n; c++ {
			cells = append(cells, cell{r, c})
		}
	}
	sort.Slice(cells, func(i, j int) bool {
		return dist[cells[i].r][cells[i].c] > dist[cells[j].r][cells[j].c]
	})
	admitted := make([][]bool, n)
	for i := range admitted {
		admitted[i] = make([]bool, n)
	}
	for _, ce := range cells {
		r, c := ce.r, ce.c
		v := dist[r][c]
		admitted[r][c] = true
		for k := 0; k < 4; k++ {
			nr, nc := r+dr[k], c+dc[k]
			if nr >= 0 && nr < n && nc >= 0 && nc < n && admitted[nr][nc] {
				a, b := find(r*n+c), find(nr*n+nc)
				if a != b {
					if size[a] < size[b] {
						a, b = b, a
					}
					parent[b] = a
					size[a] += size[b]
				}
			}
		}
		if find(0) == find(n*n-1) {
			return v
		}
	}
	// The whole grid admits in the end, so the corners always unite; 0 is
	// just the fallback.
	return 0
}
