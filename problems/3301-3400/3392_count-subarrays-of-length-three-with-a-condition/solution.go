func countSubarrays(nums []int) int {
	// The window at i qualifies when nums[i] + nums[i + 2] equals
	// exactly half of nums[i + 1]. Cross-multiplying keeps the test
	// in integers: twice the pair sum equals the middle value, and
	// an odd middle value can never pass.
	count := 0
	for i := 0; i+2 < len(nums); i++ {
		if 2*(nums[i]+nums[i+2]) == nums[i+1] {
			count++
		}
	}
	return count
}
