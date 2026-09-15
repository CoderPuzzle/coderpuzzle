func isRobotBounded(instructions string) bool {
	// simulate one pass from the origin facing north; L/R rotate the
	// heading a quarter turn via (dx, dy) -> (-dy, dx) / (dy, -dx)
	x, y := 0, 0
	dx, dy := 0, 1 // north
	for i := 0; i < len(instructions); i++ {
		switch instructions[i] {
		case 'G':
			x += dx
			y += dy
		case 'L':
			dx, dy = -dy, dx
		default: // 'R'
			dx, dy = dy, -dx
		}
	}
	// at the origin: each pass is a closed loop. Turned at all: every
	// repetition's displacement is the previous one rotated by a fixed
	// quarter turn, so at most four copies cancel back to the start.
	// Facing north while displaced repeats the same drift — the one
	// unbounded case.
	return (x == 0 && y == 0) || !(dx == 0 && dy == 1)
}
