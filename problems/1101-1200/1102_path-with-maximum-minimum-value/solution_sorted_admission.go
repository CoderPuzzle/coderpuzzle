import "sort"

func maximumMinimumPath(grid [][]int) int {
	rows := len(grid)
	cols := len(grid[0])
	// Kruskal-style admission: switch cells on biggest-first and stop the
	// moment the two corners join one admitted component -- the value of the
	// cell admitted last is the widest bottleneck any walk can hold.
	cells := make([][3]int, 0, rows*cols)
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			cells = append(cells, [3]int{grid[r][c], r, c})
		}
	}
	// Falling order of value: the biggest cells are admitted first.
	sort.Slice(cells, func(i, j int) bool { return cells[i][0] > cells[j][0] })
	total := rows * cols
	// parent[i] is -1 while cell i is unadmitted, else its union-find parent.
	parent := make([]int, total)
	for i := range parent {
		parent[i] = -1
	}
	// An unadmitted cell is its own isolated root; path halving inside find
	// keeps the forest nearly flat.
	find := func(i int) int {
		if parent[i] == -1 {
			return i
		}
		for parent[i] != i {
			parent[i] = parent[parent[i]]
			i = parent[i]
		}
		return i
	}
	union := func(a, b int) {
		ra, rb := find(a), find(b)
		if ra != rb {
			parent[ra] = rb
		}
	}
	dirs := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
	for _, cell := range cells {
		value, r, c := cell[0], cell[1], cell[2]
		idx := r*cols + c
		// Admit the cell: it becomes its own root, then merges with every
		// already-admitted neighbour.
		parent[idx] = idx
		for _, dir := range dirs {
			nr := r + dir[0]
			nc := c + dir[1]
			if nr >= 0 && nr < rows && nc >= 0 && nc < cols && parent[nr*cols+nc] != -1 {
				union(idx, nr*cols+nc)
			}
		}
		if find(0) == find(total-1) {
			return value
		}
	}
	// The full grid is connected, so the loop always returns inside.
	return 0
}
