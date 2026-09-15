func maximumSetSize(nums1 []int, nums2 []int) int {
	s1 := make(map[int]struct{}, len(nums1))
	for _, v := range nums1 {
		s1[v] = struct{}{}
	}
	s2 := make(map[int]struct{}, len(nums2))
	for _, v := range nums2 {
		s2[v] = struct{}{}
	}

	// Count values unique to each side and the shared remainder.
	only1 := 0
	for v := range s1 {
		if _, ok := s2[v]; !ok {
			only1++
		}
	}
	only2 := 0
	for v := range s2 {
		if _, ok := s1[v]; !ok {
			only2++
		}
	}
	common := len(s1) - only1

	// Each side spends its slots on unique values first; leftover slots add
	// at most one new element each, and only common values qualify, each
	// counting once no matter which side inserts it.
	half := len(nums1) / 2
	a := half
	if only1 < a {
		a = only1
	}
	b := half
	if only2 < b {
		b = only2
	}
	fill := common
	if room := len(nums1) - a - b; room < fill {
		fill = room
	}
	return a + b + fill
}
