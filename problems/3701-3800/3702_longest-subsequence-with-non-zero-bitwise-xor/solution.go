// XOR is self-inverse and order-free, so the whole array's XOR decides
// everything: non-zero means take all of it.
func longestSubsequence(nums []int) int {
	total := 0
	seenNonzero := false
	for _, value := range nums {
		total ^= value
		if value != 0 {
			seenNonzero = true
		}
	}
	// A zero total is repaired by dropping one non-zero element (the rest
	// then XORs to that element); all zeros leave nothing worth taking.
	if total != 0 {
		return len(nums)
	}
	if seenNonzero {
		return len(nums) - 1
	}
	return 0
}
