// Nothing here is a choice: each day the region whose frontier (the
// uninfected cells it would reach tonight) is largest gets walled, every
// other region infects its frontier, and the answer just accumulates the
// daily wall counts until no frontier is left.
func containVirus(isInfected [][]int) int {
	rows, cols := len(isInfected), len(isInfected[0])
	grid := make([][]int, rows)
	for row := range grid {
		grid[row] = append([]int(nil), isInfected[row]...)
	}
	walls := 0
	for {
		label := make([][]int, rows)
		for row := range label {
			label[row] = make([]int, cols)
			for col := range label[row] {
				label[row][col] = -1
			}
		}
		var regions []region
		for row := 0; row < rows; row++ {
			for col := 0; col < cols; col++ {
				if grid[row][col] == 1 && label[row][col] < 0 {
					regions = append(regions, measure(grid, label, row, col, len(regions)))
				}
			}
		}
		if len(regions) == 0 {
			return walls
		}
		best := 0
		for i := 1; i < len(regions); i++ {
			if len(regions[i].frontier) > len(regions[best].frontier) {
				best = i
			}
		}
		// No region threatens anything: the outbreak is over, walled or
		// fully spread.
		if len(regions[best].frontier) == 0 {
			return walls
		}
		walls += regions[best].walls
		// 2 marks the quarantined region: inert, never spreading again and
		// never part of a later region.
		for _, cell := range regions[best].cells {
			grid[cell[0]][cell[1]] = 2
		}
		// The night: everyone else infects their frontier at once. A cell
		// the walled region had threatened still falls to an active region —
		// walls seal only the edges they stand on.
		for i := range regions {
			if i != best {
				for cell := range regions[i].frontier {
					grid[cell/cols][cell%cols] = 1
				}
			}
		}
	}
}

type region struct {
	cells    [][2]int
	frontier map[int]bool
	walls    int
}

// Walk one region with an explicit stack, collecting its cells, its
// frontier (distinct threatened 0-cells, encoded row*cols+col) and its
// wall count — one wall per region/0-cell shared edge.
func measure(grid [][]int, label [][]int, row, col, id int) region {
	rows, cols := len(grid), len(grid[0])
	reg := region{frontier: make(map[int]bool)}
	label[row][col] = id
	stack := [][2]int{{row, col}}
	dr := [4]int{-1, 1, 0, 0}
	dc := [4]int{0, 0, -1, 1}
	for len(stack) > 0 {
		cell := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		reg.cells = append(reg.cells, cell)
		for d := 0; d < 4; d++ {
			r, c := cell[0]+dr[d], cell[1]+dc[d]
			if r < 0 || r >= rows || c < 0 || c >= cols {
				continue
			}
			if grid[r][c] == 0 {
				reg.frontier[r*cols+c] = true
				reg.walls++
			} else if grid[r][c] == 1 && label[r][c] < 0 {
				label[r][c] = id
				stack = append(stack, [2]int{r, c})
			}
		}
	}
	return reg
}
