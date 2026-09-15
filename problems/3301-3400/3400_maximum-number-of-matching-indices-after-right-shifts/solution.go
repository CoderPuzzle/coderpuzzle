// After k right shifts of nums1, index j matches iff nums1[(j-k)%n] ==
// nums2[j], so comparing nums1[i] against nums2[(i+k)%n] counts shift k's
// matches without materializing the shifted array; n <= 3000 keeps the full
// O(n^2) sweep at ~9M comparisons.
func maximumMatchingIndices(nums1 []int, nums2 []int) int {
	n := len(nums1)
	best := 0
	for k := 0; k < n && best < n; k++ {
		count := 0
		for i := 0; i < n; i++ {
			if nums1[i] == nums2[(i+k)%n] {
				count++
			}
		}
		if count > best {
			best = count
		}
	}
	return best
}
