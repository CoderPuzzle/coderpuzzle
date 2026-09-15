import "sort"

func threeSumSmaller(nums []int, target int) int {
	// Sorting is what buys the two-pointer count: past any index values only
	// grow, so a pair sum that is still too large safely retires its high
	// end, and one that is small enough retires its low end together with
	// every partner behind it.
	sort.Ints(nums)
	count := 0
	for i := 0; i < len(nums)-2; i++ {
		// The three smallest values still available already reach the
		// target: no pair works for this anchor, and sorted order makes
		// every later anchor no smaller, so the walk can stop outright.
		if nums[i]+nums[i+1]+nums[i+2] >= target {
			break
		}
		remaining := target - nums[i]
		lo, hi := i+1, len(nums)-1
		for lo < hi {
			if nums[lo]+nums[hi] < remaining {
				// Sorted order pairs this lo with every index up to hi at
				// once: hi - lo counting triplets in a single step.
				count += hi - lo
				lo++
			} else {
				hi--
			}
		}
	}
	return count
}
