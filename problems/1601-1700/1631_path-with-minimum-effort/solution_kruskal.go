import "sort"

func minimumEffortPath(heights [][]int) int {
	rows := len(heights)
	cols := len(heights[0])
	total := rows * cols
	// One edge per adjacent pair (right and down neighbor), endpoints
	// flattened to r*cols + c.
	type edge struct {
		w, a, b int
	}
	edges := make([]edge, 0, total*2)
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if r+1 < rows {
				d := heights[r+1][c] - heights[r][c]
				if d < 0 {
					d = -d
				}
				edges = append(edges, edge{d, r*cols + c, (r+1)*cols + c})
			}
			if c+1 < cols {
				d := heights[r][c+1] - heights[r][c]
				if d < 0 {
					d = -d
				}
				edges = append(edges, edge{d, r*cols + c, r*cols + c + 1})
			}
		}
	}
	// Ascending weight order is Kruskal's skeleton: the first edge that
	// joins the two corners is the minimum possible maximum.
	sort.Slice(edges, func(i, j int) bool { return edges[i].w < edges[j].w })
	parent := make([]int, total)
	size := make([]int, total)
	for i := range parent {
		parent[i] = i
		size[i] = 1
	}
	var find func(int) int
	find = func(x int) int {
		// Path compression keeps later finds near O(1).
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}
	union := func(a, b int) {
		ra, rb := find(a), find(b)
		if ra == rb {
			return
		}
		// Union by size keeps the trees shallow.
		if size[ra] < size[rb] {
			ra, rb = rb, ra
		}
		parent[rb] = ra
		size[ra] += size[rb]
	}
	// A 1x1 grid is connected to itself from the start.
	if find(0) == find(total-1) {
		return 0
	}
	for _, e := range edges {
		if find(e.a) == find(e.b) {
			continue
		}
		union(e.a, e.b)
		// Once both corners share a component, every path between them uses
		// some edge of weight at least w, and w already suffices.
		if find(0) == find(total-1) {
			return e.w
		}
	}
	return 0
}
