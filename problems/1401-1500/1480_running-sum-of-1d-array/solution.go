func runningSum(nums []int64) []int64 {
	result := make([]int64, len(nums))
	copy(result, nums)
	for i := 1; i < len(result); i++ {
		result[i] += result[i-1]
	}
	return result
}
