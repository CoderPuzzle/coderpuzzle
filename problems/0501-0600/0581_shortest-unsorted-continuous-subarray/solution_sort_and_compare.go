import "sort"

// Sort a copy and compare position by position: everything outside the
// reorder window already sits where the sorted order puts it, so the FIRST
// and LAST disagreeing positions are the window's edges.
func findUnsortedSubarray(nums []int) int {
	sorted := make([]int, len(nums))
	copy(sorted, nums)
	sort.Ints(sorted)
	start := 0
	for start < len(nums) && nums[start] == sorted[start] {
		start++
	}
	if start == len(nums) {
		return 0
	}
	end := len(nums) - 1
	for nums[end] == sorted[end] {
		end--
	}
	return end - start + 1
}
