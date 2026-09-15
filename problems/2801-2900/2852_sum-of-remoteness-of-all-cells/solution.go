func sumRemoteness(grid [][]int) int64 {
	// One flood fill per unvisited non-blocked cell totals the size and
	// value of its component; a cell reaches exactly its own component,
	// so its remoteness is every other component's value, and summing
	// that over all cells collapses to size * (total - component_sum).
	rows, columns := len(grid), len(grid[0])
	visited := make([][]bool, rows)
	for r := range visited {
		visited[r] = make([]bool, columns)
	}
	type component struct {
		size   int64
		values int64
	}
	total := int64(0)
	var components []component
	for startRow := 0; startRow < rows; startRow++ {
		for startColumn := 0; startColumn < columns; startColumn++ {
			if grid[startRow][startColumn] == -1 || visited[startRow][startColumn] {
				continue
			}
			visited[startRow][startColumn] = true
			stack := [][2]int{{startRow, startColumn}}
			size, values := int64(0), int64(0)
			for len(stack) > 0 {
				cell := stack[len(stack)-1]
				stack = stack[:len(stack)-1]
				r, c := cell[0], cell[1]
				size++
				values += int64(grid[r][c])
				steps := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
				for _, step := range steps {
					nr, nc := r+step[0], c+step[1]
					if nr >= 0 && nr < rows && nc >= 0 && nc < columns &&
						grid[nr][nc] != -1 && !visited[nr][nc] {
						visited[nr][nc] = true
						stack = append(stack, [2]int{nr, nc})
					}
				}
			}
			total += values
			components = append(components, component{size, values})
		}
	}
	answer := int64(0)
	for _, comp := range components {
		answer += comp.size * (total - comp.values)
	}
	return answer
}
