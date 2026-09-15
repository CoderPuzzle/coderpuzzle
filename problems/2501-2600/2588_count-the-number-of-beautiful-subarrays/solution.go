func beautifulSubarrays(nums []int) int64 {
	// Each operation clears one set bit in each of two elements, so the XOR
	// of a subarray is invariant; it reduces to all zeros exactly when its
	// XOR is already 0.
	count := make(map[int]int64)
	// Seed with the empty prefix so subarrays starting at index 0 are
	// witnessed when their prefix XOR returns to 0.
	count[0] = 1
	x := 0
	var ans int64
	for _, v := range nums {
		x ^= v
		// Subarray (j, i] has XOR prefix[j] ^ prefix[i], which vanishes
		// exactly when the prefixes match: each earlier equal prefix is one
		// beautiful subarray ending here.
		ans += count[x]
		count[x]++
	}
	return ans
}
