func addedInteger(nums1 []int, nums2 []int) int {
	// Adding one constant x to every element of nums1 shifts its minimum by
	// exactly x, so x = min(nums2) - min(nums1) is forced; the input
	// guarantee promises that this x reproduces nums2's multiset, and any
	// pair admitting some x admits only one. Values stay in [-1000, 1000].
	lo1, lo2 := math.MaxInt32, math.MaxInt32
	for i := range nums1 {
		lo1 = min(lo1, nums1[i])
		lo2 = min(lo2, nums2[i])
	}
	return lo2 - lo1
}
