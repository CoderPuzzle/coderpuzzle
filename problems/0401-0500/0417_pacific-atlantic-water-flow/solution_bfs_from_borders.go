func pacificAtlantic(heights [][]int) [][]int {
	m, n := len(heights), len(heights[0])

	// Reverse the flow: walk inland from the ocean border instead of
	// downhill from every cell, so one traversal finds all draining cells.
	reachable := func(border [][2]int) [][]bool {
		seen := make([][]bool, m)
		for r := range seen {
			seen[r] = make([]bool, n)
		}
		queue := make([][2]int, 0, m*n)
		for _, cell := range border {
			if !seen[cell[0]][cell[1]] {
				seen[cell[0]][cell[1]] = true
			}
			queue = append(queue, cell)
		}
		dirs := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
		for head := 0; head < len(queue); head++ {
			r, c := queue[head][0], queue[head][1]
			for _, d := range dirs {
				nr, nc := r+d[0], c+d[1]
				// Only a neighbor at least as tall could have flowed down
				// into (r, c).
				if nr >= 0 && nr < m && nc >= 0 && nc < n &&
					!seen[nr][nc] && heights[nr][nc] >= heights[r][c] {
					// Mark on enqueue so each cell enters the queue at most once.
					seen[nr][nc] = true
					queue = append(queue, [2]int{nr, nc})
				}
			}
		}
		return seen
	}

	// Pacific seeds: top row + left column; Atlantic: bottom row + right
	// column. Corners appear in both seed lists.
	pacificBorder := make([][2]int, 0, m+n)
	for c := 0; c < n; c++ {
		pacificBorder = append(pacificBorder, [2]int{0, c})
	}
	for r := 0; r < m; r++ {
		pacificBorder = append(pacificBorder, [2]int{r, 0})
	}
	atlanticBorder := make([][2]int, 0, m+n)
	for c := 0; c < n; c++ {
		atlanticBorder = append(atlanticBorder, [2]int{m - 1, c})
	}
	for r := 0; r < m; r++ {
		atlanticBorder = append(atlanticBorder, [2]int{r, n - 1})
	}

	pacific := reachable(pacificBorder)
	atlantic := reachable(atlanticBorder)

	// Row-major intersection of the two reachable sets comes out sorted.
	result := [][]int{}
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			if pacific[r][c] && atlantic[r][c] {
				result = append(result, []int{r, c})
			}
		}
	}
	return result
}
