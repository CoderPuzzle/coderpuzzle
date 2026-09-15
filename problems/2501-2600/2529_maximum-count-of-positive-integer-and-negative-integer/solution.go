import (
	"sort"
)

// In a sorted array the negatives are exactly the prefix ending before
// the first value >= 0 and the positives are exactly the suffix starting
// at the first value >= 1. Two sort.Search calls fix both boundaries in
// O(log n); zeros belong to neither side.
func maximumCount(nums []int) int {
	lowerBound := func(target int) int {
		return sort.Search(len(nums), func(i int) bool { return nums[i] >= target })
	}
	neg := lowerBound(0)
	pos := len(nums) - lowerBound(1)
	if neg > pos {
		return neg
	}
	return pos
}
