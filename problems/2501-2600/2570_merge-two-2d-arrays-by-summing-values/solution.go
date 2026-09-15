func mergeArrays(nums1 [][]int, nums2 [][]int) [][]int {
	// Both inputs are sorted by id, so two pointers walk them in lockstep,
	// always emitting the smaller head id next: shared ids merge their
	// values, single-side ids pass through unchanged. The result is sorted
	// by construction and holds each id once.
	merged := [][]int{}
	i, j := 0, 0
	for i < len(nums1) && j < len(nums2) {
		switch {
		case nums1[i][0] == nums2[j][0]:
			merged = append(merged, []int{nums1[i][0], nums1[i][1] + nums2[j][1]})
			i++
			j++
		case nums1[i][0] < nums2[j][0]:
			row := make([]int, 2)
			copy(row, nums1[i])
			merged = append(merged, row)
			i++
		default:
			row := make([]int, 2)
			copy(row, nums2[j])
			merged = append(merged, row)
			j++
		}
	}
	// One tail is empty here; the other carries its remaining rows.
	for ; i < len(nums1); i++ {
		merged = append(merged, nums1[i])
	}
	for ; j < len(nums2); j++ {
		merged = append(merged, nums2[j])
	}
	return merged
}
