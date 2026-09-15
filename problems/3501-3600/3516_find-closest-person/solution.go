// Same speed means arrival order is just distance order, so compare the two
// absolute distances to the stationary Person 3.
func findClosest(x int, y int, z int) int {
	dx := x - z
	if dx < 0 {
		dx = -dx
	}
	dy := y - z
	if dy < 0 {
		dy = -dy
	}
	if dx < dy {
		return 1
	}
	if dy < dx {
		return 2
	}
	return 0
}
