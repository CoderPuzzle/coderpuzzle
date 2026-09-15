func minimumMoves(grid [][]int) int {
	// State (r, c, horizontal): (r, c) is the upper-left occupied cell;
	// horizontal snakes occupy (r,c) and (r,c+1), vertical (r,c),(r+1,c).
	n := len(grid)
	type state struct {
		r, c, horizontal, moves int
	}
	queue := []state{{0, 0, 1, 0}}
	visited := map[int]bool{0*200 + 0*2 + 1: true}
	for len(queue) > 0 {
		cur := queue[0]
		queue = queue[1:]
		r, c, horizontal, moves := cur.r, cur.c, cur.horizontal, cur.moves
		if r == n-1 && c == n-2 && horizontal == 1 {
			return moves
		}
		if horizontal == 1 {
			// Slide right: the new head cell must be empty.
			if c+2 < n && grid[r][c+2] == 0 && !visited[r*n+(c+1)*2+1] {
				visited[r*n+(c+1)*2+1] = true
				queue = append(queue, state{r, c + 1, 1, moves + 1})
			}
			// Slide down: both cells of the new row must be empty.
			if r+1 < n && grid[r+1][c] == 0 && grid[r+1][c+1] == 0 && !visited[(r+1)*n+c*2+1] {
				visited[(r+1)*n+c*2+1] = true
				queue = append(queue, state{r + 1, c, 1, moves + 1})
			}
			// Rotate clockwise: the two cells under the snake must be empty.
			if r+1 < n && grid[r+1][c] == 0 && grid[r+1][c+1] == 0 && !visited[r*n+c*2+0] {
				visited[r*n+c*2+0] = true
				queue = append(queue, state{r, c, 0, moves + 1})
			}
		} else {
			// Slide right: both cells of the new column must be empty.
			if c+1 < n && grid[r][c+1] == 0 && grid[r+1][c+1] == 0 && !visited[r*n+(c+1)*2+0] {
				visited[r*n+(c+1)*2+0] = true
				queue = append(queue, state{r, c + 1, 0, moves + 1})
			}
			// Slide down: the new tail cell must be empty.
			if r+2 < n && grid[r+2][c] == 0 && !visited[(r+1)*n+c*2+0] {
				visited[(r+1)*n+c*2+0] = true
				queue = append(queue, state{r + 1, c, 0, moves + 1})
			}
			// Rotate counterclockwise: the two cells to the right must be empty.
			if c+1 < n && grid[r][c+1] == 0 && grid[r+1][c+1] == 0 && !visited[r*n+c*2+1] {
				visited[r*n+c*2+1] = true
				queue = append(queue, state{r, c, 1, moves + 1})
			}
		}
	}
	return -1
}
