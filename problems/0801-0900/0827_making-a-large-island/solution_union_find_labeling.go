func largestIsland(grid [][]int) int {
	n := len(grid)
	cells := n * n
	// Disjoint-set forest over the cells: parent[i*n+j] points at the
	// cell's current representative, and size is maintained per
	// representative only. Union by size plus path compression keeps
	// the trees nearly flat.
	parent := make([]int, cells)
	size := make([]int, cells)
	for idx := range parent {
		parent[idx] = idx
		size[idx] = 1
	}

	find := func(x int) int {
		root := x
		for parent[root] != root {
			root = parent[root]
		}
		for parent[x] != root {
			parent[x], x = root, parent[x]
		}
		return root
	}

	unite := func(a, b int) {
		a = find(a)
		b = find(b)
		if a == b {
			return
		}
		if size[a] < size[b] {
			a, b = b, a
		}
		parent[b] = a
		size[a] += size[b]
	}

	// One row-major pass: each 1-cell joins the (already processed)
	// 1-cell to its left and the one above, so every island is
	// assembled edge by edge and no traversal stack is needed.
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			if grid[i][j] == 1 {
				idx := i*n + j
				if j > 0 && grid[i][j-1] == 1 {
					unite(idx, idx-1)
				}
				if i > 0 && grid[i-1][j] == 1 {
					unite(idx, idx-n)
				}
			}
		}
	}

	// Best starts at the largest existing island — also the answer
	// when the grid is all 1s and no 0 exists to flip.
	best := 0
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			if grid[i][j] == 1 {
				if s := size[find(i*n+j)]; s > best {
					best = s
				}
			}
		}
	}
	dirs := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			if grid[i][j] == 0 {
				// Dedup matters: one island can touch this 0 on
				// several sides, and counting it twice would
				// overstate the merge. The dedup key is the root.
				seen := make(map[int]bool)
				total := 1
				for _, d := range dirs {
					ni, nj := i+d[0], j+d[1]
					if ni >= 0 && ni < n && nj >= 0 && nj < n && grid[ni][nj] == 1 {
						root := find(ni*n + nj)
						if !seen[root] {
							seen[root] = true
							total += size[root]
						}
					}
				}
				if total > best {
					best = total
				}
			}
		}
	}
	return best
}
