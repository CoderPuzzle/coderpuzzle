func applyOperations(nums []int) []int {
	// Phase 1: apply the n-1 operations left to right; doubling an element
	// zeroes its right neighbor, which the next comparison sees.
	result := append([]int(nil), nums...)
	for i := 0; i+1 < len(result); i++ {
		if result[i] == result[i+1] {
			result[i] *= 2
			result[i+1] = 0
		}
	}
	// Phase 2: stable-compact non-zero values to the front, then pad.
	write := 0
	for _, value := range result {
		if value != 0 {
			result[write] = value
			write++
		}
	}
	for i := write; i < len(result); i++ {
		result[i] = 0
	}
	return result
}
