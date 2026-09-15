// Two bisections honor the statement's O(log n) requirement: the run of
// targets starts at the first index >= target and ends one slot before the
// first index >= target + 1.
func searchRange(nums []int, target int) []int {
	start := lowerBound(nums, target)
	if start == len(nums) || nums[start] != target {
		return []int{-1, -1}
	}
	return []int{start, lowerBound(nums, target+1) - 1}
}

// Smallest index whose value is >= limit; len(nums) if none. The kept half
// always contains that boundary, so the window halves until only the boundary
// is left.
func lowerBound(nums []int, limit int) int {
	lo, hi := 0, len(nums)
	for lo < hi {
		mid := (lo + hi) / 2
		if nums[mid] < limit {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	return lo
}
