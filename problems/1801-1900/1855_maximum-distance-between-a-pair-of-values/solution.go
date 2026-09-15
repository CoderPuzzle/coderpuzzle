// Two pointers: as i grows, nums1[i] shrinks, so the farthest usable j never
// moves left. Advance j as far as validity allows.
func maxDistance(nums1 []int, nums2 []int) int {
	best := 0
	j := 0
	for i := range nums1 {
		for j < len(nums2) && (j < i || nums2[j] >= nums1[i]) {
			j++
		}
		if j > i && nums2[j-1] >= nums1[i] {
			if d := j - 1 - i; d > best {
				best = d
			}
		}
	}
	return best
}
