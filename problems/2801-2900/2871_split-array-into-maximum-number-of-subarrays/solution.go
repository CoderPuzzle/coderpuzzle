func maxSubarrays(nums []int) int {
	completed := 0
	current := -1
	for _, num := range nums {
		current &= num
		if current == 0 {
			completed++
			current = -1
		}
	}
	if completed < 1 {
		return 1
	}
	return completed
}
