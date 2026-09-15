// Modified binary search: the minimum sits at the rotation point, located by
// comparing the midpoint against the window's right end — except when an
// equal run straddles the pivot, where one index is discarded to restore
// decisiveness.
func findMin(nums []int) int {
	lo, hi := 0, len(nums)-1
	for lo < hi {
		mid := (lo + hi) / 2
		if nums[mid] > nums[hi] {
			// A value larger than nums[hi] can only sit before the
			// rotation point, so the minimum lies strictly right of mid.
			lo = mid + 1
		} else if nums[mid] < nums[hi] {
			// nums[mid..hi] is non-decreasing, so the rotation point —
			// and the minimum — is at mid or to its left; mid stays
			// a candidate.
			hi = mid
		} else {
			// nums[mid] == nums[hi]: the equal run may straddle the
			// pivot, so neither comparison above can tell where the
			// minimum hides. nums[hi] also appears at mid, so dropping
			// index hi cannot lose the minimum while strictly
			// shrinking the window.
			hi--
		}
	}
	return nums[lo]
}
