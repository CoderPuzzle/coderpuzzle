func numberOfPairs(nums1 []int, nums2 []int, k int) int {
	// The constraints are tiny (50 x 50), so the direct double loop
	// wins: for every value in nums2 build the divisor nums2[j] * k and
	// count how many values of nums1 it divides.
	total := 0
	for _, value := range nums1 {
		for _, base := range nums2 {
			divisor := base * k
			if value%divisor == 0 {
				total++
			}
		}
	}
	return total
}
