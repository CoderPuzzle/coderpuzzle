func minimumSwaps(nums []int) int {
	zeros := 0
	for _, value := range nums {
		if value == 0 {
			zeros++
		}
	}
	prefixLength := len(nums) - zeros
	answer := 0
	for i := 0; i < prefixLength; i++ {
		if nums[i] == 0 {
			answer++
		}
	}
	return answer
}
