func singleNumber(nums []int) int {
	result := int64(0)
	for i := uint(0); i < 32; i++ {
		// Triples contribute 0 or 3 set bits at position i (a multiple of
		// three); the unique value contributes 0 or 1 — so count%3 is exactly
		// bit i of the answer.
		count := 0
		for _, value := range nums {
			count += (value >> i) & 1
		}
		if count%3 != 0 {
			result |= 1 << i
		}
	}
	// Reinterpret the assembled bit pattern as a signed 32-bit int.
	return int(int32(result))
}
