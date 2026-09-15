const gridSize = 1000000

func cellKey(x, y int) int64 {
	return int64(x)*gridSize + int64(y)
}

// With n blocked cells, the largest pocket they can wall off is the
// triangular staircase in a grid corner: n * (n - 1) / 2 cells. If a
// flood-fill from an endpoint ever visits more cells than that, the
// endpoint cannot be trapped, so the fill can stop early instead of
// exploring the (unmaterializable) rest of the grid.
func canEscapeLocally(start, goal [2]int, blockedSet map[int64]bool, maxEnclosedArea int64) bool {
	visited := map[int64]bool{cellKey(start[0], start[1]): true}
	stack := [][2]int{start}
	directions := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}

	for len(stack) > 0 {
		if int64(len(visited)) > maxEnclosedArea {
			return true
		}
		cur := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		for _, direction := range directions {
			nx, ny := cur[0]+direction[0], cur[1]+direction[1]
			if nx < 0 || nx >= gridSize || ny < 0 || ny >= gridSize {
				continue
			}
			k := cellKey(nx, ny)
			if blockedSet[k] || visited[k] {
				continue
			}
			if nx == goal[0] && ny == goal[1] {
				return true
			}
			visited[k] = true
			stack = append(stack, [2]int{nx, ny})
		}
	}
	return false
}

func isEscapePossible(blocked [][]int, source []int, target []int) bool {
	blockedSet := make(map[int64]bool, len(blocked))
	for _, cell := range blocked {
		blockedSet[cellKey(cell[0], cell[1])] = true
	}
	n := int64(len(blockedSet))
	maxEnclosedArea := n * (n - 1) / 2

	src := [2]int{source[0], source[1]}
	tgt := [2]int{target[0], target[1]}

	// source cannot reach past its own pocket boundary AND target cannot
	// reach past its own pocket boundary -- both must escape their local
	// neighborhood for a path to exist between them.
	return canEscapeLocally(src, tgt, blockedSet, maxEnclosedArea) &&
		canEscapeLocally(tgt, src, blockedSet, maxEnclosedArea)
}
