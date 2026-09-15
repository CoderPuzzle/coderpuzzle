// Fill nums1 from the back so the largest elements land last: the n tail
// slots are declared scratch, and a write at m+n-1 moving down can never pass
// an unread nums1 element.
func merge(nums1 []int, m int, nums2 []int, n int) []int {
	i, j := m-1, n-1
	for write := m + n - 1; j >= 0; write-- {
		if i >= 0 && nums1[i] > nums2[j] {
			nums1[write] = nums1[i]
			i--
		} else {
			nums1[write] = nums2[j]
			j--
		}
	}
	// nums2 is exhausted: any nums1 prefix left unread is already in place.
	return nums1
}
