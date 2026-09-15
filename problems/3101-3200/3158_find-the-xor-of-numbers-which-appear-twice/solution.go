// One pass with a value -> count tally; values seen exactly twice
// contribute to the XOR. XOR is its own inverse and self-canceling, so
// values occurring once must be excluded by the count, not folded in
// blindly. Values are bounded by 50 here; an int suffices.
func duplicateNumbersXOR(nums []int) int {
	counts := make(map[int]int)
	for _, value := range nums {
		counts[value]++
	}
	answer := 0
	for value, count := range counts {
		if count == 2 {
			answer ^= value
		}
	}
	return answer
}
