func robotSim(commands []int, obstacles [][]int) int {
	// Replay the walk exactly as stated: the heading is an index on the
	// four cardinal directions, a turn is one step around that cycle
	// (right +1, left +3, mod 4), and a forward command is unit moves
	// that halt the whole command the moment the next cell is blocked.
	// Obstacles live in a set for constant-time membership, and the
	// answer is the largest x*x + y*y over the whole path in time, not
	// just at the final cell.
	blocked := make(map[[2]int]bool, len(obstacles))
	for _, obstacle := range obstacles {
		blocked[[2]int{obstacle[0], obstacle[1]}] = true
	}
	var dx = [4]int{0, 1, 0, -1} // north, east, south, west
	var dy = [4]int{1, 0, -1, 0}
	x, y, heading, best := 0, 0, 0, 0
	for _, command := range commands {
		switch command {
		case -2: // turn left
			heading = (heading + 3) & 3
		case -1: // turn right
			heading = (heading + 1) & 3
		default:
			for step := 0; step < command; step++ {
				next := [2]int{x + dx[heading], y + dy[heading]}
				if blocked[next] {
					break
				}
				x, y = next[0], next[1]
				if squared := x*x + y*y; squared > best {
					best = squared
				}
			}
		}
	}
	return best
}
