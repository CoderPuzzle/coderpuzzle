func findKOr(nums []int, k int) int {
	// Inputs are < 2^31, so only bit positions 0..30 can ever appear and
	// the result stays a non-negative 32-bit integer.
	result := 0
	for bit := 0; bit < 31; bit++ {
		// Count the elements carrying this bit; k or more set it.
		count := 0
		for _, num := range nums {
			count += (num >> bit) & 1
		}
		if count >= k {
			result |= 1 << bit
		}
	}
	return result
}
