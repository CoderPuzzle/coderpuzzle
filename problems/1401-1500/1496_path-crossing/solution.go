func isPathCrossing(path string) bool {
	x, y := 0, 0
	type point struct{ x, y int }
	visited := make(map[point]bool)
	visited[point{0, 0}] = true
	for _, step := range path {
		switch step {
		case 'N':
			y++
		case 'S':
			y--
		case 'E':
			x++
		default:
			x--
		}
		if visited[point{x, y}] {
			return true
		}
		visited[point{x, y}] = true
	}
	return false
}
