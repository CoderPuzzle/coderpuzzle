func minElement(nums []int) int {
	// Replacement acts per element, and a number's digit sum is never
	// larger than the number itself, so the answer is the smallest
	// per-element digit sum.
	best := -1
	for _, value := range nums {
		digitSum := 0
		for value > 0 {
			digitSum += value % 10
			value /= 10
		}
		// The running minimum can only decrease: every replacement
		// shrinks (or keeps) its element.
		if best < 0 || digitSum < best {
			best = digitSum
		}
	}
	return best
}
