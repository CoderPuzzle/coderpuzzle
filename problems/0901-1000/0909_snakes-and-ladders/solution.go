func snakesAndLadders(board [][]int) int {
	// The game is an unweighted shortest-path search: squares are nodes
	// and dice rolls are edges of cost 1, so BFS from square 1 finds the
	// fewest moves. Flatten the board with the boustrophedon walk (bottom
	// row left to right, next row right to left, flipping each row up);
	// a roll landing on square s resolves to cells[s] when that entry is
	// not -1 and to s otherwise — exactly one mandatory teleport, never
	// chained, since the landing square is enqueued as an ordinary node.
	// Each node expands to the at-most-six destinations in
	// [curr + 1, min(curr + 6, n*n)], and an empty level means n*n
	// is unreachable.
	n := len(board)
	target := n * n
	cells := make([]int, target+1)
	square := 1
	for rowFromBottom := 0; rowFromBottom < n; rowFromBottom++ {
		row := board[n-1-rowFromBottom]
		for column := 0; column < n; column++ {
			if rowFromBottom%2 == 0 {
				cells[square] = row[column]
			} else {
				cells[square] = row[n-1-column]
			}
			square++
		}
	}
	visited := make([]bool, target+1)
	visited[1] = true
	current := []int{1}
	moves := 0
	for len(current) > 0 {
		moves++
		reachable := make([]int, 0, len(current)*6)
		for _, curr := range current {
			furthest := curr + 6
			if furthest > target {
				furthest = target
			}
			for next := curr + 1; next <= furthest; next++ {
				destination := next
				if cells[next] != -1 {
					destination = cells[next]
				}
				if destination == target {
					return moves
				}
				if !visited[destination] {
					visited[destination] = true
					reachable = append(reachable, destination)
				}
			}
		}
		current = reachable
	}
	return -1
}
