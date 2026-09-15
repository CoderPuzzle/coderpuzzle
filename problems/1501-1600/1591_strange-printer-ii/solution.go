func isPrintable(targetGrid [][]int) bool {
	rows, cols := len(targetGrid), len(targetGrid[0])

	// Each color's bounding rectangle: the smallest axis-aligned box that
	// covers every cell holding that color in the target grid.
	type box struct{ minRow, maxRow, minCol, maxCol int }
	bbox := make(map[int]*box)
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			color := targetGrid[r][c]
			b, ok := bbox[color]
			if !ok {
				bbox[color] = &box{r, r, c, c}
				continue
			}
			if r < b.minRow {
				b.minRow = r
			}
			if r > b.maxRow {
				b.maxRow = r
			}
			if c < b.minCol {
				b.minCol = c
			}
			if c > b.maxCol {
				b.maxCol = c
			}
		}
	}

	// An edge color -> other means color's bounding box shows `other`
	// somewhere inside it, so color must be stamped before `other`.
	adjacency := make(map[int]map[int]bool)
	for color := range bbox {
		adjacency[color] = make(map[int]bool)
	}
	for color, b := range bbox {
		neighbors := adjacency[color]
		for r := b.minRow; r <= b.maxRow; r++ {
			for c := b.minCol; c <= b.maxCol; c++ {
				other := targetGrid[r][c]
				if other != color {
					neighbors[other] = true
				}
			}
		}
	}

	// A valid stamp order exists iff this dependency graph has no cycle.
	const (
		white = 0
		gray  = 1
		black = 2
	)
	state := make(map[int]int)
	for color := range bbox {
		state[color] = white
	}

	var hasCycle func(node int) bool
	hasCycle = func(node int) bool {
		state[node] = gray
		for neighbor := range adjacency[node] {
			if state[neighbor] == gray {
				return true
			}
			if state[neighbor] == white && hasCycle(neighbor) {
				return true
			}
		}
		state[node] = black
		return false
	}

	for color := range bbox {
		if state[color] == white && hasCycle(color) {
			return false
		}
	}
	return true
}
