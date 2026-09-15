func triangularSum(nums []int) int {
	current := make([]int, len(nums))
	copy(current, nums)
	for length := len(current); length > 1; length-- {
		for i := 0; i+1 < length; i++ {
			current[i] = (current[i] + current[i+1]) % 10
		}
	}
	return current[0]
}
