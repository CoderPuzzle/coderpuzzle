import "sort"

func minimizeSum(nums []int) int {
	// The two changed slots can always be set equal to each other,
	// which pins the low score at 0 regardless of anything else, so
	// only the span of what remains matters. After sorting there are
	// just three competitive plans, one per way of spending the two
	// changes: lift the two smallest values into the body, drop the
	// two largest, or split one change on each end. Any other pair of
	// positions is dominated by one of these, since a wasted change
	// can always copy an existing value for free.
	sort.Ints(nums)
	n := len(nums)
	return min(nums[n-1]-nums[2], nums[n-2]-nums[1], nums[n-3]-nums[0])
}
