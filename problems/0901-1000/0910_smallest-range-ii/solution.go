import "sort"

// Sorted, a best plan lifts a prefix by k and lowers the rest by k; everyone
// moving together just keeps the raw span.
func smallestRangeII(nums []int, k int) int {
	sort.Ints(nums)
	n := len(nums)
	best := nums[n-1] - nums[0]
	for i := 1; i < n; i++ {
		// Cut after i elements: the extremes can only be the four boundary
		// values around the cut.
		high := max(nums[i-1]+k, nums[n-1]-k)
		low := min(nums[0]+k, nums[i]-k)
		best = min(best, high-low)
	}
	return best
}
