func maxMatrixSum(matrix [][]int) int64 {
	// Each operation flips two border-adjacent cells, so the parity of the
	// negative count is invariant: an even count makes every value positive,
	// an odd count must leave the smallest-magnitude value negative.
	// Accumulate in int64: 250^2 * 1e5 = 6.25e9 > 2^31.
	var total int64
	negatives := 0
	smallest := 100000
	for _, row := range matrix {
		for _, value := range row {
			magnitude := value
			if magnitude < 0 {
				magnitude = -magnitude
			}
			total += int64(magnitude)
			if value < 0 {
				negatives++
			}
			if magnitude < smallest {
				smallest = magnitude
			}
		}
	}
	if negatives%2 == 1 {
		total -= 2 * int64(smallest)
	}
	return total
}
