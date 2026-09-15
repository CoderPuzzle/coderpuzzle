import "sort"

// A string of more digits is always the larger integer, so ordering by
// length first and lexicographically second is numeric order.
func kthLargestNumber(nums []string, k int) string {
	sort.Slice(nums, func(a, b int) bool {
		if len(nums[a]) != len(nums[b]) {
			return len(nums[a]) < len(nums[b])
		}
		return nums[a] < nums[b]
	})
	return nums[len(nums)-k]
}
