func widestPairOfIndices(nums1 []int, nums2 []int) int {
	// Track the running prefix difference (sum1 - sum2); a range has equal
	// sums in both arrays iff the difference repeats. Seed the empty
	// prefix's value 0 at -1 so pairs starting at index 0 measure correctly.
	first := make(map[int]int, len(nums1)*2)
	first[0] = -1
	diff := 0
	best := 0
	for i := 0; i < len(nums1); i++ {
		diff += nums1[i] - nums2[i]
		// A repeated difference spans a valid pair; keeping only each
		// value's FIRST occurrence maximizes every later span using it.
		if j, ok := first[diff]; ok {
			if i-j > best {
				best = i - j
			}
		} else {
			first[diff] = i
		}
	}
	return best
}
