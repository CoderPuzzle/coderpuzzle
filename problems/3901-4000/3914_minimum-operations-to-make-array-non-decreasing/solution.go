func minOperations(nums []int) int64 {
	var total int64
	for i := 1; i < len(nums); i++ {
		if nums[i-1] > nums[i] {
			total += int64(nums[i-1]) - int64(nums[i])
		}
	}
	return total
}
