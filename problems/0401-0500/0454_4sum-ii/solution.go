func fourSumCount(nums1 []int, nums2 []int, nums3 []int, nums4 []int) int {
	// Meet in the middle: a+b+c+d = 0 iff a+b = -(c+d), so index the first
	// two arrays' pair sums with multiplicities (not a set).
	sums := make(map[int]int)
	for _, a := range nums1 {
		for _, b := range nums2 {
			sums[a+b]++
		}
	}
	total := 0
	// Each (c,d) pair adds the number of (a,b) pairs summing to its
	// negation; every zero tuple is counted once via its unique split.
	for _, c := range nums3 {
		for _, d := range nums4 {
			total += sums[-(c + d)]
		}
	}
	return total
}
