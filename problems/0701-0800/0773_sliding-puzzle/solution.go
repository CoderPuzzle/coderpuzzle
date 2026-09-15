func slidingPuzzle(board [][]int) int {
	target := "123450"
	// Adjacency of each row-major cell on the 2x3 board (-1 = none),
	// so the expansion needs no bounds logic.
	neighbors := [6][3]int{
		{1, 3, -1}, {0, 2, 4}, {1, 5, -1}, {0, 4, -1}, {3, 5, 1}, {2, 4, -1},
	}
	// Boards are nodes, slides of the 0 are edges: BFS gives the
	// minimum move count over at most 6! = 720 states, encoded as
	// strings so they hash into a visited set.
	startBytes := make([]byte, 0, 6)
	for _, row := range board {
		for _, v := range row {
			startBytes = append(startBytes, byte('0'+v))
		}
	}
	start := string(startBytes)
	if start == target {
		return 0
	}
	visited := map[string]bool{start: true}
	type item struct {
		state string
		moves int
	}
	queue := []item{{start, 0}}
	for len(queue) > 0 {
		cur := queue[0]
		queue = queue[1:]
		zero := 0
		for k := 0; k < 6; k++ {
			if cur.state[k] == '0' {
				zero = k
				break
			}
		}
		for _, nxt := range neighbors[zero] {
			if nxt < 0 {
				continue
			}
			// Swap the 0 with a neighboring tile to make a successor.
			chars := []byte(cur.state)
			chars[zero], chars[nxt] = chars[nxt], chars[zero]
			newState := string(chars)
			if newState == target {
				return cur.moves + 1
			}
			// Enqueue only unvisited states so each expands once.
			if !visited[newState] {
				visited[newState] = true
				queue = append(queue, item{newState, cur.moves + 1})
			}
		}
	}
	// Queue exhausted: the target sits in the unreachable half of the
	// permutations (odd parity).
	return -1
}
