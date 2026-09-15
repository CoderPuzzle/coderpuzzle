func minOperations(nums1 []int, nums2 []int) int64 {
	// Every slot i != j pays |nums1[i] - nums2[i]|, and the chosen source j
	// pays that same per-slot cost plus one append plus the distance from
	// the tail value to the span between nums1[j] and nums2[j]. The base sum
	// is common to every choice, so only the tail-to-span distance varies;
	// take its minimum. Sums reach 1e10, so 64-bit.
	n := len(nums1)
	base := int64(0)
	for i := 0; i < n; i++ {
		diff := nums1[i] - nums2[i]
		if diff < 0 {
			diff = -diff
		}
		base += int64(diff)
	}
	tail := int64(nums2[n])
	bestGap := int64(-1)
	for i := 0; i < n; i++ {
		a, b := int64(nums1[i]), int64(nums2[i])
		lo, hi := a, b
		if b < lo {
			lo, hi = b, a
		}
		gap := int64(0)
		if tail < lo {
			gap = lo - tail
		} else if tail > hi {
			gap = tail - hi
		}
		if bestGap == -1 || gap < bestGap {
			bestGap = gap
		}
	}
	return base + 1 + bestGap
}
