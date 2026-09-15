// Sweep row-major: every island is discovered exactly once, at the first
// cell the scan meets, and counted by flooding it with an explicit queue.
// Iterating rather than recursing is the point — a snake-shaped island at
// the bound chains thousands of cells deep, far past any call stack a
// submission is granted.
func maxAreaOfIsland(grid [][]int) int {
	m, n := len(grid), len(grid[0])
	seen := make([][]bool, m)
	for r := range seen {
		seen[r] = make([]bool, n)
	}
	// Cells packed as r*n + c in one flat queue, reused per island.
	queue := make([]int, m*n)
	best := 0
	for i := range grid {
		for j := range grid[i] {
			if grid[i][j] != 1 || seen[i][j] {
				continue
			}
			seen[i][j] = true
			head, tail := 0, 0
			queue[tail] = i*n + j
			tail++
			area := 0
			// A cell is marked when it enters the queue, never when it
			// leaves, so no cell is ever enqueued twice.
			for head < tail {
				cell := queue[head]
				head++
				r, c := cell/n, cell%n
				area++
				if r > 0 && grid[r-1][c] == 1 && !seen[r-1][c] {
					seen[r-1][c] = true
					queue[tail] = cell - n
					tail++
				}
				if r+1 < m && grid[r+1][c] == 1 && !seen[r+1][c] {
					seen[r+1][c] = true
					queue[tail] = cell + n
					tail++
				}
				if c > 0 && grid[r][c-1] == 1 && !seen[r][c-1] {
					seen[r][c-1] = true
					queue[tail] = cell - 1
					tail++
				}
				if c+1 < n && grid[r][c+1] == 1 && !seen[r][c+1] {
					seen[r][c+1] = true
					queue[tail] = cell + 1
					tail++
				}
			}
			best = max(best, area)
		}
	}
	return best
}
