func findIntersectionValues(nums1 []int, nums2 []int) []int {
	// answer1 counts indices whose value exists anywhere in the other
	// array; existence, not multiplicity, is what matters, so the only
	// state needed is each array's set of distinct values.
	set1 := make(map[int]struct{}, len(nums1))
	set2 := make(map[int]struct{}, len(nums2))
	for _, x := range nums1 {
		set1[x] = struct{}{}
	}
	for _, y := range nums2 {
		set2[y] = struct{}{}
	}
	answer1 := 0
	for _, x := range nums1 {
		if _, ok := set2[x]; ok {
			answer1++
		}
	}
	answer2 := 0
	for _, y := range nums2 {
		if _, ok := set1[y]; ok {
			answer2++
		}
	}
	return []int{answer1, answer2}
}
