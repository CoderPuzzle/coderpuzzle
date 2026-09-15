// One BFS per building, not per empty cell: each search floods the empty
// region once, and every empty cell accumulates its distance from that
// building plus a count of buildings that reached it.
func shortestDistance(grid [][]int) int {
	m, n := len(grid), len(grid[0])
	moves := [4][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	// Cells are flattened to r*n + c so the sums, counts, and BFS queue are
	// plain int slices.
	distSum := make([]int, m*n)
	reach := make([]int, m*n)
	buildings := 0
	for br := 0; br < m; br++ {
		for bc := 0; bc < n; bc++ {
			if grid[br][bc] != 1 {
				continue
			}
			buildings++
			// BFS starts at the building itself; buildings and obstacles are
			// impassable, so the search only ever walks into empty land and
			// stops where another building blocks the way.
			step := make([]int, m*n)
			for i := range step {
				step[i] = -1
			}
			step[br*n+bc] = 0
			queue := []int{br*n + bc}
			for head := 0; head < len(queue); head++ {
				pos := queue[head]
				r, c := pos/n, pos%n
				for _, move := range moves {
					nr, nc := r+move[0], c+move[1]
					if nr < 0 || nr >= m || nc < 0 || nc >= n || grid[nr][nc] != 0 || step[nr*n+nc] >= 0 {
						continue
					}
					step[nr*n+nc] = step[pos] + 1
					distSum[nr*n+nc] += step[nr*n+nc]
					reach[nr*n+nc]++
					queue = append(queue, nr*n+nc)
				}
			}
		}
	}
	// A house site must reach EVERY building — a cell sealed off from one
	// building is invalid no matter how short its other distances are.
	best := -1
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			pos := r*n + c
			if grid[r][c] == 0 && reach[pos] == buildings && (best < 0 || distSum[pos] < best) {
				best = distSum[pos]
			}
		}
	}
	return best
}
