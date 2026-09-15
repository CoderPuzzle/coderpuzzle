// One pass of nested indexing: nums is a permutation of 0..n-1, so
// every value is itself a valid index and nums[nums[i]] is in range.
func buildArray(nums []int) []int {
	ans := make([]int, len(nums))
	for i, x := range nums {
		ans[i] = nums[x]
	}
	return ans
}
