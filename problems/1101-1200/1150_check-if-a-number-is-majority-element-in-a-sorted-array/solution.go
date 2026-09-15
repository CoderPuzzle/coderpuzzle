import "sort"

func isMajorityElement(nums []int, target int) bool {
	// Sorted array: the target's occurrences form one contiguous run, whose
	// length is the distance between the two search boundaries.
	low := sort.SearchInts(nums, target)
	high := low + sort.Search(len(nums)-low, func(i int) bool { return nums[low+i] > target })
	return 2*(high-low) > len(nums)
}
