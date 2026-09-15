import "sort"

// The order is not a choice: the trees must fall shortest to tallest. What is
// left to plan is only the walk between consecutive trees, and each of those
// legs is an unweighted shortest path — a plain BFS. Cutting a tree rewrites
// its cell to 1, which is still walkable, so every leg can search the original
// forest unchanged.
func cutOffTree(forest [][]int) int {
	trees := make([][]int, 0, len(forest)*len(forest[0]))
	for row, line := range forest {
		for col, height := range line {
			if height > 1 {
				trees = append(trees, []int{height, row, col})
			}
		}
	}
	sort.Slice(trees, func(i, j int) bool { return trees[i][0] < trees[j][0] })
	total := 0
	row, col := 0, 0
	for _, tree := range trees {
		steps := walk(forest, row, col, tree[1], tree[2])
		if steps < 0 {
			return -1
		}
		total += steps
		row, col = tree[1], tree[2]
	}
	return total
}

func walk(forest [][]int, startRow, startCol, targetRow, targetCol int) int {
	// A wall under the walker means the leg never begins; only the initial
	// (0, 0) can actually be a 0 cell.
	if forest[startRow][startCol] == 0 {
		return -1
	}
	if startRow == targetRow && startCol == targetCol {
		return 0
	}
	rows, cols := len(forest), len(forest[0])
	pending := [][]int{{startRow, startCol}}
	distance := make([][]int, rows)
	for row := range distance {
		distance[row] = make([]int, cols)
		for col := range distance[row] {
			distance[row][col] = -1
		}
	}
	distance[startRow][startCol] = 0
	dr := [4]int{-1, 1, 0, 0}
	dc := [4]int{0, 0, -1, 1}
	for head := 0; head < len(pending); head++ {
		cell := pending[head]
		near := distance[cell[0]][cell[1]] + 1
		for d := 0; d < 4; d++ {
			row, col := cell[0]+dr[d], cell[1]+dc[d]
			// Trees and empty cells are both walkable; only 0 is not.
			if row < 0 || row >= rows || col < 0 || col >= cols || forest[row][col] == 0 || distance[row][col] >= 0 {
				continue
			}
			if row == targetRow && col == targetCol {
				return near
			}
			distance[row][col] = near
			pending = append(pending, []int{row, col})
		}
	}
	return -1
}
