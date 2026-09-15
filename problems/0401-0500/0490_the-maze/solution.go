// The state space is the set of cells where the ball can come to rest: from
// each stop, a roll in one of the four directions is deterministic — it ends
// at the last empty cell before a wall or the border — and only those rest
// cells can ever be chosen as the next starting point.
func hasPath(maze [][]int, start []int, destination []int) bool {
	// The ball begins at rest, so the start cell is itself a stopping
	// position and seeds the queue.
	queue := [][]int{{start[0], start[1]}}
	stopped := make([][]bool, len(maze))
	for row := range stopped {
		stopped[row] = make([]bool, len(maze[0]))
	}
	stopped[start[0]][start[1]] = true
	dr := [4]int{-1, 1, 0, 0}
	dc := [4]int{0, 0, -1, 1}
	for len(queue) > 0 {
		cell := queue[0]
		queue = queue[1:]
		row, col := cell[0], cell[1]
		if row == destination[0] && col == destination[1] {
			return true
		}
		// A roll is deterministic, so each stop has at most four
		// successors — the rest cells of its four rolls — and every
		// one of them is scheduled exactly once.
		for d := 0; d < 4; d++ {
			rest := roll(maze, row, col, dr[d], dc[d])
			if !stopped[rest[0]][rest[1]] {
				stopped[rest[0]][rest[1]] = true
				queue = append(queue, rest)
			}
		}
	}
	return false
}

// The border acts as a wall, so leaving the grid ends the roll just like a
// 1 cell does.
func roll(maze [][]int, row, col, dr, dc int) []int {
	for {
		nextRow, nextCol := row+dr, col+dc
		if nextRow < 0 || nextRow >= len(maze) || nextCol < 0 || nextCol >= len(maze[0]) || maze[nextRow][nextCol] == 1 {
			return []int{row, col}
		}
		row, col = nextRow, nextCol
	}
}
