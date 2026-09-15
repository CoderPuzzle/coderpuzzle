func bestTower(towers [][]int, center []int, radius int) []int {
	cx, cy := center[0], center[1]
	best := []int{}
	bestQuality := -1
	for _, tower := range towers {
		x, y, quality := tower[0], tower[1], tower[2]
		dx, dy := x-cx, y-cy
		if dx < 0 {
			dx = -dx
		}
		if dy < 0 {
			dy = -dy
		}
		if dx+dy > radius {
			continue
		}
		// Strictly better quality wins; on a quality tie the
		// lexicographically smaller coordinate wins.
		if len(best) == 0 || quality > bestQuality ||
			(quality == bestQuality && (x < best[0] || (x == best[0] && y < best[1]))) {
			best = []int{x, y}
			bestQuality = quality
		}
	}
	if len(best) == 0 {
		return []int{-1, -1}
	}
	return best
}
