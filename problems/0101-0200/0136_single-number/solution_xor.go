func singleNumber(nums []int) int {
	// XOR fold: x ^ x = 0 cancels each pair, x ^ 0 = x passes the lone
	// value through, and commutativity makes grouping order irrelevant.
	result := 0
	for _, value := range nums {
		result ^= value
	}
	// Only the unpaired element survives in the accumulator.
	return result
}
