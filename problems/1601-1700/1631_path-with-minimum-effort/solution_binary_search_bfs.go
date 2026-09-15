func minimumEffortPath(heights [][]int) int {
	rows := len(heights)
	cols := len(heights[0])
	// hi = the largest adjacent height difference: no path can force a bigger
	// step. A 1x1 grid has no edges, so hi stays 0 and the loop never runs.
	hi := 0
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if r+1 < rows {
				d := heights[r+1][c] - heights[r][c]
				if d < 0 {
					d = -d
				}
				if d > hi {
					hi = d
				}
			}
			if c+1 < cols {
				d := heights[r][c+1] - heights[r][c]
				if d < 0 {
					d = -d
				}
				if d > hi {
					hi = d
				}
			}
		}
	}
	lo := 0
	// Feasibility is monotone in the cap: a path that fits under a cap still
	// fits under any larger one, so binary search applies.
	for lo < hi {
		mid := lo + (hi-lo)/2
		if reachable(heights, rows, cols, mid) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}

func reachable(heights [][]int, rows int, cols int, cap int) bool {
	visited := make([][]bool, rows)
	for i := range visited {
		visited[i] = make([]bool, cols)
	}
	visited[0][0] = true
	queue := [][2]int{{0, 0}}
	dirs := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
	for head := 0; head < len(queue); head++ {
		r, c := queue[head][0], queue[head][1]
		if r == rows-1 && c == cols-1 {
			return true
		}
		for _, d := range dirs {
			nr, nc := r+d[0], c+d[1]
			if nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] {
				diff := heights[nr][nc] - heights[r][c]
				if diff < 0 {
					diff = -diff
				}
				// Only steps within the current cap may be crossed.
				if diff <= cap {
					visited[nr][nc] = true
					queue = append(queue, [2]int{nr, nc})
				}
			}
		}
	}
	return false
}
