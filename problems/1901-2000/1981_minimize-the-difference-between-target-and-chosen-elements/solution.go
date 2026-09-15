// Reachable sums as a boolean table: sum s is reachable after the rows
// processed so far. The largest possible total bounds the table.
func minimizeTheDifference(mat [][]int, target int) int {
	maxSum := 0
	for _, row := range mat {
		rowMax := 0
		for _, value := range row {
			if value > rowMax {
				rowMax = value
			}
		}
		maxSum += rowMax
	}
	reachable := make([]bool, maxSum+1)
	reachable[0] = true
	for _, row := range mat {
		next := make([]bool, maxSum+1)
		for s, ok := range reachable {
			if ok {
				for _, value := range row {
					if s+value <= maxSum {
						next[s+value] = true
					}
				}
			}
		}
		reachable = next
	}
	// Closest set slot below target, then the smallest one above it.
	best := -1
	start := target
	if start > maxSum {
		start = maxSum
	}
	for s := start; s >= 0; s-- {
		if reachable[s] {
			best = target - s
			break
		}
	}
	for s := target + 1; s <= maxSum; s++ {
		if reachable[s] {
			gap := s - target
			if best < 0 || gap < best {
				best = gap
			}
			break
		}
	}
	return best
}
