func getMaxLen(nums []int) int {
	// `posLen` / `negLen` are the lengths of the longest subarrays ending at
	// the current index whose product is positive / negative. A zero breaks
	// any run, so both reset to 0. A positive value keeps every sign as-is:
	// `posLen` always extends, `negLen` only extends if there already was a
	// negative-ending run. A negative value flips every sign, so the two
	// lengths swap roles (each extended by one) before moving on: what used
	// to end negative now ends positive, and what used to end positive now
	// ends negative.
	posLen := 0
	negLen := 0
	maxLen := 0
	for _, x := range nums {
		if x == 0 {
			posLen = 0
			negLen = 0
		} else if x > 0 {
			posLen++
			if negLen > 0 {
				negLen++
			} else {
				negLen = 0
			}
		} else {
			newPosLen := 0
			if negLen > 0 {
				newPosLen = negLen + 1
			}
			newNegLen := posLen + 1
			posLen = newPosLen
			negLen = newNegLen
		}
		if posLen > maxLen {
			maxLen = posLen
		}
	}
	return maxLen
}
