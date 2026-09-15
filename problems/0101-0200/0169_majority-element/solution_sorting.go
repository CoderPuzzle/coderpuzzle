import "sort"

func majorityElement(nums []int) int {
	// Sort in place: the majority's occurrences stand together as one run
	// longer than half the array, and a run that long must cover the
	// middle -- so the value at the halfway index is the majority,
	// whatever the input order was.
	sort.Ints(nums)
	return nums[len(nums)/2]
}
