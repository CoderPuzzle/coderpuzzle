import "sort"

func majorityElement(nums []int) int {
	// Sorting turns the count into a position: equal values form one run,
	// the majority's run is longer than half the array, and a run that long
	// always covers the middle index n / 2.
	sort.Ints(nums)
	// Whatever order the input arrived in, the middle of the sorted order is
	// the majority.
	return nums[len(nums)/2]
}
