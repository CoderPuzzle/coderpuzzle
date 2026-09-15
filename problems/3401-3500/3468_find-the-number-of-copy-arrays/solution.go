func countArrays(original []int, bounds [][]int) int {
	// copy[0] fixes every later entry: copy[i] = copy[0] + original[i] - original[0].
	// Keep the window of admissible copy[0] values by folding each bound in.
	lo, hi := bounds[0][0], bounds[0][1]
	for i := 1; i < len(original); i++ {
		shift := original[i] - original[0]
		if bound := bounds[i][0] - shift; bound > lo {
			lo = bound
		}
		if bound := bounds[i][1] - shift; bound < hi {
			hi = bound
		}
		if lo > hi {
			return 0
		}
	}
	return hi - lo + 1
}
