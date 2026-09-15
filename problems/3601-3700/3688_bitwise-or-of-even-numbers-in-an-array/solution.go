func evenNumberBitwiseORs(nums []int) int {
	// Fold each even value into the accumulator as the scan passes it; 0
	// is the OR identity, so an array with no evens returns 0.
	result := 0
	for _, value := range nums {
		if value%2 == 0 {
			result |= value
		}
	}
	return result
}
