// Identify the whole connected component first (BFS with an explicit
// queue — depth safety), classifying each member's border status against
// the ORIGINAL grid values. Only after every member has been classified
// does a second pass repaint the collected border cells, so an
// in-progress repaint can never corrupt a later cell's neighbor check.
func colorBorder(grid [][]int, row int, col int, color int) [][]int {
	m, n := len(grid), len(grid[0])
	original := grid[row][col]
	visited := make([]bool, m*n)
	queue := make([]int, m*n)
	border := make([]int, m*n)
	borderCount := 0
	head, tail := 0, 0
	visited[row*n+col] = true
	queue[tail] = row*n + col
	tail++
	for head < tail {
		cell := queue[head]
		head++
		r, c := cell/n, cell%n
		isBorder := r == 0 || r == m-1 || c == 0 || c == n-1
		if r > 0 {
			if grid[r-1][c] != original {
				isBorder = true
			} else if !visited[cell-n] {
				visited[cell-n] = true
				queue[tail] = cell - n
				tail++
			}
		}
		if r+1 < m {
			if grid[r+1][c] != original {
				isBorder = true
			} else if !visited[cell+n] {
				visited[cell+n] = true
				queue[tail] = cell + n
				tail++
			}
		}
		if c > 0 {
			if grid[r][c-1] != original {
				isBorder = true
			} else if !visited[cell-1] {
				visited[cell-1] = true
				queue[tail] = cell - 1
				tail++
			}
		}
		if c+1 < n {
			if grid[r][c+1] != original {
				isBorder = true
			} else if !visited[cell+1] {
				visited[cell+1] = true
				queue[tail] = cell + 1
				tail++
			}
		}
		if isBorder {
			border[borderCount] = cell
			borderCount++
		}
	}
	for i := 0; i < borderCount; i++ {
		cell := border[i]
		grid[cell/n][cell%n] = color
	}
	return grid
}
