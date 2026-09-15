func minOperations(nums []int, target []int) int {
	// Choosing x rewrites exactly the cells whose current value is x (all
	// maximal x-segments land on their target values), so a mismatched cell
	// keeps its value until an operation names that value. Naming a value
	// clears its whole mismatch class; no other cell moves. The answer is
	// the number of classes: distinct nums[i] where it differs from
	// target[i]. The count is at most n <= 1e5, so int is always safe.
	distinct := make(map[int]struct{})
	for i := range nums {
		if nums[i] != target[i] {
			distinct[nums[i]] = struct{}{}
		}
	}
	return len(distinct)
}
