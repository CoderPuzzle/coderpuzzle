import "math"

func minimumOperations(grid [][]int) int {
	// Vertical equality makes each column one constant value; horizontal
	// inequality only links adjacent columns. dp[v] = cheapest total for
	// processed columns ending with value v, extended over the ten digits
	// that grid cells may hold.
	rows := len(grid)
	previous := make([]int, 10)
	for j := 0; j < len(grid[0]); j++ {
		counts := make([]int, 10)
		for _, row := range grid {
			counts[row[j]]++
		}
		current := make([]int, 10)
		for value := 0; value < 10; value++ {
			bestPrev := math.MaxInt32
			for k := 0; k < 10; k++ {
				if k != value && previous[k] < bestPrev {
					bestPrev = previous[k]
				}
			}
			current[value] = rows - counts[value] + bestPrev
		}
		previous = current
	}
	best := math.MaxInt32
	for _, value := range previous {
		if value < best {
			best = value
		}
	}
	return best
}
