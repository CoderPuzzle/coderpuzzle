func canPartitionGrid(grid [][]int) bool {
	// A straight cut yields two rectangular slabs. Removing any single
	// cell from a slab spanning at least two rows and two columns keeps
	// it connected, so only slabs that are a single row or column
	// restrict the discount to their two end cells (a 1x1 slab would
	// empty out and can never match the other side's positive sum).
	// Sweep each axis twice with rolling prefix sums and a value set:
	// the forward pass tries discounting the leading slab, the backward
	// pass the trailing one. Sums reach 10^5 * 10^5 = 10^10, so they
	// are carried in int64.
	m, n := len(grid), len(grid[0])
	total := int64(0)
	for _, row := range grid {
		for _, v := range row {
			total += int64(v)
		}
	}
	canDiscount := func(d int64, a, b int, vertical bool, seen map[int64]struct{}) bool {
		// Can discounting one cell of value d from the slab rows/cols
		// a..b equalize the two sides while keeping the slab connected?
		if vertical {
			if a == b {
				return m > 1 && (int64(grid[0][a]) == d || int64(grid[m-1][a]) == d)
			}
			if m == 1 {
				return int64(grid[0][a]) == d || int64(grid[0][b]) == d
			}
			_, ok := seen[d]
			return ok
		}
		if a == b {
			return n > 1 && (int64(grid[a][0]) == d || int64(grid[a][n-1]) == d)
		}
		if n == 1 {
			return int64(grid[a][0]) == d || int64(grid[b][0]) == d
		}
		_, ok := seen[d]
		return ok
	}
	seen := make(map[int64]struct{})
	top := int64(0)
	for i := 0; i < m-1; i++ {
		for _, v := range grid[i] {
			seen[int64(v)] = struct{}{}
			top += int64(v)
		}
		bottom := total - top
		if top == bottom || (top > bottom && canDiscount(top-bottom, 0, i, false, seen)) {
			return true
		}
	}
	seen = make(map[int64]struct{})
	bottom := int64(0)
	for i := m - 1; i > 0; i-- {
		for _, v := range grid[i] {
			seen[int64(v)] = struct{}{}
			bottom += int64(v)
		}
		top = total - bottom
		if top == bottom || (bottom > top && canDiscount(bottom-top, i, m-1, false, seen)) {
			return true
		}
	}
	seen = make(map[int64]struct{})
	left := int64(0)
	for j := 0; j < n-1; j++ {
		for r := 0; r < m; r++ {
			seen[int64(grid[r][j])] = struct{}{}
			left += int64(grid[r][j])
		}
		right := total - left
		if left == right || (left > right && canDiscount(left-right, 0, j, true, seen)) {
			return true
		}
	}
	seen = make(map[int64]struct{})
	right := int64(0)
	for j := n - 1; j > 0; j-- {
		for r := 0; r < m; r++ {
			seen[int64(grid[r][j])] = struct{}{}
			right += int64(grid[r][j])
		}
		left = total - right
		if left == right || (right > left && canDiscount(right-left, j, n-1, true, seen)) {
			return true
		}
	}
	return false
}
