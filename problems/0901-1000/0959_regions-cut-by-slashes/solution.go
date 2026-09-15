// Cut the square into four triangles per cell — top, right, bottom, left —
// and let an iterative union-find glue them together: the cell's own
// marking joins triangles inside the cell, and shared edges join triangles
// across cell borders. Each surviving set is exactly one region, so the
// answer is the number of distinct roots among the 4*n*n triangles.
// Nothing recurses — find walks parent links and compresses the walked
// path in loops.
func regionsBySlashes(grid []string) int {
	n := len(grid)
	parent := make([]int, 4*n*n)
	for x := range parent {
		parent[x] = x
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
		if ra, rb := find(a), find(b); ra != rb {
			parent[ra] = rb
		}
	}
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			base := 4 * (i*n + j)
			ch := grid[i][j]
			// '/' joins top with left and right with bottom, '\' joins top
			// with right and bottom with left, a blank joins all.
			switch ch {
			case ' ':
				unite(base, base+1)
				unite(base+1, base+2)
				unite(base+2, base+3)
			case '/':
				unite(base, base+3)
				unite(base+1, base+2)
			default:
				unite(base, base+1)
				unite(base+2, base+3)
			}
			// The bottom triangle shares its open edge with the cell
			// below's top triangle; the right triangle with the right
			// neighbor's left triangle.
			if i+1 < n {
				unite(base+2, base+4*n)
			}
			if j+1 < n {
				unite(base+1, base+4+3)
			}
		}
	}
	// Roots are exactly the self-parented nodes, so counting those counts
	// regions.
	regions := 0
	for x := range parent {
		if parent[x] == x {
			regions++
		}
	}
	return regions
}
