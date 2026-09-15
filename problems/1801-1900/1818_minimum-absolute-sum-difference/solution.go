import "sort"

// The initial sum is fixed; a replacement at index i can only cut
// |nums1[i] - nums2[i]| down to the distance from nums2[i] to the nearest
// value in nums1, so hunt that nearest value in a sorted copy and keep the
// largest saving seen.
func minAbsoluteSumDiff(nums1 []int, nums2 []int) int {
	const MOD = 1000000007
	sorted1 := append([]int(nil), nums1...)
	sort.Ints(sorted1)
	// the raw sum tops out at 10^10 — beyond 32-bit — so it accumulates in
	// an int64 and narrows only after the modulo
	total := int64(0)
	bestGain := int64(0)
	for i := range nums1 {
		b := int64(nums2[i])
		diff := int64(nums1[i]) - b
		if diff < 0 {
			diff = -diff
		}
		total += diff
		// neighbors of nums2[i] in the sorted copy bracket the nearest value
		position := sort.SearchInts(sorted1, nums2[i])
		nearest := diff
		if position < len(sorted1) {
			if d := int64(sorted1[position]) - b; d < nearest {
				nearest = d
			}
		}
		if position > 0 {
			if d := b - int64(sorted1[position-1]); d < nearest {
				nearest = d
			}
		}
		if gain := diff - nearest; gain > bestGain {
			bestGain = gain
		}
	}
	return int((total - bestGain) % MOD)
}
