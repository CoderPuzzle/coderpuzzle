func maximumXOR(nums []int) int {
	answer := 0
	for _, value := range nums {
		answer |= value
	}
	return answer
}
