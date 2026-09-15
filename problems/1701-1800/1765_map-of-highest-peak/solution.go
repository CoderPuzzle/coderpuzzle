func highestPeak(isWater [][]int) [][]int {
	m, n := len(isWater), len(isWater[0])
	// Optimal height = distance to the nearest water: the two rules cap
	// every cell there, and assigning exactly that maximizes all cells at
	// once (neighboring distances differ by at most 1).
	height := make([][]int, m)
	for i := range height {
		height[i] = make([]int, n)
		for j := range height[i] {
			height[i][j] = -1
		}
	}
	q := make([][2]int, 0)
	// Multi-source BFS: every water cell starts at height 0; each BFS ring
	// is one step farther from some water cell.
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if isWater[i][j] == 1 {
				height[i][j] = 0
				q = append(q, [2]int{i, j})
			}
		}
	}
	for head := 0; head < len(q); head++ {
		i, j := q[head][0], q[head][1]
		for _, d := range [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}} {
			ni, nj := i+d[0], j+d[1]
			// height == -1 doubles as the visited marker, so each cell is
			// enqueued once, by its nearest source.
			if ni >= 0 && ni < m && nj >= 0 && nj < n && height[ni][nj] == -1 {
				height[ni][nj] = height[i][j] + 1
				q = append(q, [2]int{ni, nj})
			}
		}
	}
	return height
}
