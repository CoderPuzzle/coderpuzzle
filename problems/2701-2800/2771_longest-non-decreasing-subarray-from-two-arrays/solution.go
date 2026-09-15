// run1/run2: longest non-decreasing run ending exactly at the current
// index, choosing nums1[i] / nums2[i]. Each transition compares against
// both previous picks under >=, so a run may switch source arrays anywhere.
func maxNonDecreasingLength(nums1 []int, nums2 []int) int {
	run1, run2, best := 1, 1, 1
	for i := 1; i < len(nums1); i++ {
		next1 := 1
		if nums1[i] >= nums1[i-1] {
			next1 = max(next1, run1+1)
		}
		if nums1[i] >= nums2[i-1] {
			next1 = max(next1, run2+1)
		}
		next2 := 1
		if nums2[i] >= nums1[i-1] {
			next2 = max(next2, run1+1)
		}
		if nums2[i] >= nums2[i-1] {
			next2 = max(next2, run2+1)
		}
		run1, run2 = next1, next2
		best = max(best, max(next1, next2))
	}
	return best
}
