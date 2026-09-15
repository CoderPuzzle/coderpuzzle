func maximumDifference(nums []int) int {
	minimum := nums[0]
	answer := -1
	for _, value := range nums[1:] {
		if value > minimum && value-minimum > answer {
			answer = value - minimum
		}
		if value < minimum {
			minimum = value
		}
	}
	return answer
}
