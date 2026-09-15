// A swap moves a contiguous block of difference between the arrays:
// sum(nums1) changes by the range sum of nums2[i] - nums1[i], and
// sum(nums2) by the negated amount. Each side's best outcome is its
// base sum plus a maximum subarray of that difference array.
func maximumsSplicedArray(nums1 []int, nums2 []int) int {
	// Kadane clamped at 0 covers "not do anything" for free.
	splicedBest := func(base []int, other []int) int {
		baseSum, bestGain, current := 0, 0, 0
		for i, baseValue := range base {
			baseSum += baseValue
			difference := other[i] - baseValue
			current = max(difference, current+difference)
			bestGain = max(bestGain, current)
		}
		return baseSum + bestGain
	}
	return max(splicedBest(nums1, nums2), splicedBest(nums2, nums1))
}
