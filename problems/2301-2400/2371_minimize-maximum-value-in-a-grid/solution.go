import "sort"

func minScore(grid [][]int) [][]int {
	m, n := len(grid), len(grid[0])
	type cell struct {
		v, r, c int
	}
	cells := make([]cell, 0, m*n)
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			cells = append(cells, cell{grid[r][c], r, c})
		}
	}
	sort.Slice(cells, func(i, j int) bool {
		if cells[i].v != cells[j].v {
			return cells[i].v < cells[j].v
		}
		if cells[i].r != cells[j].r {
			return cells[i].r < cells[j].r
		}
		return cells[i].c < cells[j].c
	})
	// Assign in ascending original order: when a cell's turn comes, every
	// smaller cell sharing its row/column is already placed, so only the
	// running maxima of that row and column constrain it.
	rowMax := make([]int, m)
	colMax := make([]int, n)
	res := make([][]int, m)
	for r := range res {
		res[r] = make([]int, n)
	}
	for _, cl := range cells {
		// Smallest legal replacement: 1 + max of what's already in the
		// row/column; larger demands come only from unplaced cells, which
		// receive strictly larger values later by construction.
		v := 1 + rowMax[cl.r]
		if colMax[cl.c] > v-1 {
			v = 1 + colMax[cl.c]
		}
		res[cl.r][cl.c] = v
		rowMax[cl.r] = v
		colMax[cl.c] = v
	}
	return res
}
