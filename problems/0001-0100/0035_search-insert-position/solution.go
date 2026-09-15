// Bisection for the lower bound: the first index whose value is >= target.
// Present or absent, that index is the answer.
func searchInsert(nums []int, target int) int {
	lo, hi := 0, len(nums)
	for lo < hi {
		mid := lo + (hi-lo)/2
		if nums[mid] < target {
			// Too small: the answer sits strictly right of mid.
			lo = mid + 1
		} else {
			// nums[mid] >= target keeps mid a live candidate.
			hi = mid
		}
	}
	return lo
}
