func getCommon(nums1 []int, nums2 []int) int {
	// Both arrays ascend, so the front runner carrying the smaller value
	// can never match anything ahead on the other side: drop it and
	// repeat. The first tie is necessarily the smallest shared value; a
	// drained side proves no common element exists.
	i, j := 0, 0
	for i < len(nums1) && j < len(nums2) {
		switch {
		case nums1[i] == nums2[j]:
			return nums1[i]
		case nums1[i] < nums2[j]:
			i++
		default:
			j++
		}
	}
	return -1
}
