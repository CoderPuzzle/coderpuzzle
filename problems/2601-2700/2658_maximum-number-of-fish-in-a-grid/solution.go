func findMaxFish(grid [][]int) int {
	// Every unvisited water cell seeds one flood fill that totals the fish
	// of its connected component; the best component total wins.
	rows, columns := len(grid), len(grid[0])
	visited := make([][]bool, rows)
	for r := range visited {
		visited[r] = make([]bool, columns)
	}
	best := 0
	for startRow := 0; startRow < rows; startRow++ {
		for startColumn := 0; startColumn < columns; startColumn++ {
			if grid[startRow][startColumn] == 0 || visited[startRow][startColumn] {
				continue
			}
			visited[startRow][startColumn] = true
			stack := [][2]int{{startRow, startColumn}}
			total := 0
			for len(stack) > 0 {
				cell := stack[len(stack)-1]
				stack = stack[:len(stack)-1]
				r, c := cell[0], cell[1]
				total += grid[r][c]
				steps := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
				for _, step := range steps {
					nr, nc := r+step[0], c+step[1]
					if nr >= 0 && nr < rows && nc >= 0 && nc < columns &&
						grid[nr][nc] > 0 && !visited[nr][nc] {
						visited[nr][nc] = true
						stack = append(stack, [2]int{nr, nc})
					}
				}
			}
			if total > best {
				best = total
			}
		}
	}
	return best
}
