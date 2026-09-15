// Cheapest totals that leave house i red, blue, or green; a color may not
// extend its own ending, which is the adjacency rule.
func minCost(costs [][]int) int {
	red, blue, green := costs[0][0], costs[0][1], costs[0][2]
	for _, cost := range costs[1:] {
		// Each next ending is computed from the previous ones before any
		// variable is overwritten.
		nextRed := cost[0] + min(blue, green)
		nextBlue := cost[1] + min(red, green)
		nextGreen := cost[2] + min(red, blue)
		red, blue, green = nextRed, nextBlue, nextGreen
	}
	// The last house may end in any color, so the answer is the cheapest
	// of the three surviving endings.
	return min(red, blue, green)
}
