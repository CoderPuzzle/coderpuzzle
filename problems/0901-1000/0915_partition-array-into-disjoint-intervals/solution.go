// Suffix minima: minFrom[i] is the minimum of nums[i:], built right to
// left so each step reuses the suffix behind it. The prefix max sweep then
// takes the first cut whose left max clears the right min.
func partitionDisjoint(nums []int) int {
	n := len(nums)
	minFrom := make([]int, n)
	minFrom[n-1] = nums[n-1]
	for i := n - 2; i >= 0; i-- {
		minFrom[i] = min(nums[i], minFrom[i+1])
	}
	maxTo := nums[0]
	for i := 1; i < n; i++ {
		if maxTo <= minFrom[i] {
			return i
		}
		// The first cut found is the smallest valid left; extending the
		// prefix max only matters while no cut has cleared the test.
		maxTo = max(maxTo, nums[i])
	}
	// Unreachable on valid input: the guarantee says a cut exists.
	return n - 1
}
