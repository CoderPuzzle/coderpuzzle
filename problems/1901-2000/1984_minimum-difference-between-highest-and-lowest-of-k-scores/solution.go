import "sort"

// Sort so the k chosen students form a contiguous window; the span of that
// window is its highest minus lowest score.
func minimumDifference(nums []int, k int) int {
	sort.Ints(nums)
	best := nums[k-1] - nums[0]
	for i := k; i < len(nums); i++ {
		gap := nums[i] - nums[i-k+1]
		if gap < best {
			best = gap
		}
	}
	return best
}
