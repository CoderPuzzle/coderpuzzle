import "sort"

// Four or fewer elements can all be pulled to one value in at most three
// moves. Otherwise try each of the four ways to split three removals
// between the low end and the high end of the sorted array.
func minDifference(nums []int) int {
	n := len(nums)
	if n <= 4 {
		return 0
	}
	sort.Ints(nums)
	best := nums[n-4] - nums[0]
	for i := 1; i < 4; i++ {
		diff := nums[n-4+i] - nums[i]
		if diff < best {
			best = diff
		}
	}
	return best
}
