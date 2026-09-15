// Cheapest totals that leave the previous house painted each color,
// compressed to the smallest, the second smallest, and the color holding
// the smallest: a color may not extend its own ending.
func minCostII(costs [][]int) int {
	smallest, second, smallestColor := 0, 0, -1
	for _, cost := range costs {
		// One pass over the row: every color takes the smallest previous
		// ending unless it IS the smallest's color, when only the second
		// smallest may legally be extended.
		nextSmallest, nextSecond, nextColor := 1<<30, 1<<30, -1
		for color, value := range cost {
			previous := smallest
			if color == smallestColor {
				previous = second
			}
			ending := value + previous
			if ending < nextSmallest {
				nextSecond = nextSmallest
				nextSmallest = ending
				nextColor = color
			} else if ending < nextSecond {
				nextSecond = ending
			}
		}
		smallest, second, smallestColor = nextSmallest, nextSecond, nextColor
	}
	// The last house may end in any color, and the smallest ending is the
	// cheapest of them.
	return smallest
}
