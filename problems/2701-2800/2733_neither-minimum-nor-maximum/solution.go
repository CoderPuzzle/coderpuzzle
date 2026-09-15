func findNonMinOrMax(nums []int) int {
	if len(nums) < 3 {
		return -1
	}
	sum := nums[0] + nums[1] + nums[2]
	lo := min(min(nums[0], nums[1]), nums[2])
	hi := max(max(nums[0], nums[1]), nums[2])
	return sum - lo - hi
}
