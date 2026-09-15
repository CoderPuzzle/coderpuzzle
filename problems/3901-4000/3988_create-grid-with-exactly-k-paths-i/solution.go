import "strings"

func createGrid(m int, n int, k int) []string {
	if m == 1 || n == 1 {
		if k != 1 {
			return []string{}
		}
		open := ""
		for j := 0; j < n; j++ {
			open += "."
		}
		grid := make([]string, m)
		for i := range grid {
			grid[i] = open
		}
		return grid
	}

	// (height, width, is the 3x3 k=4 pattern) per k, tried in order.
	blocks := [][][]int{
		{{1, 1, 0}},
		{{2, 2, 0}},
		{{2, 3, 0}, {3, 2, 0}},
		{{2, 4, 0}, {4, 2, 0}, {3, 3, 1}},
	}[k-1]
	for _, block := range blocks {
		height, width := block[0], block[1]
		if height > m || width > n {
			continue
		}
		grid := make([][]byte, m)
		for i := range grid {
			grid[i] = []byte(strings.Repeat("#", n))
		}
		for i := 0; i < height; i++ {
			for j := 0; j < width; j++ {
				grid[i][j] = '.'
			}
		}
		if block[2] == 1 {
			grid[0][width-1] = '#'
			grid[height-1][0] = '#'
		}
		for j := width - 1; j < n; j++ {
			grid[height-1][j] = '.'
		}
		for i := height - 1; i < m; i++ {
			grid[i][n-1] = '.'
		}
		rows := make([]string, m)
		for i := range grid {
			rows[i] = string(grid[i])
		}
		return rows
	}
	return []string{}
}
