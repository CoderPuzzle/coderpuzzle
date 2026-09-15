func targetIndices(nums []int, target int) []int {
	smaller, equal := 0, 0
	for _, value := range nums {
		if value < target {
			smaller++
		} else if value == target {
			equal++
		}
	}
	answer := make([]int, equal)
	for offset := range answer {
		answer[offset] = smaller + offset
	}
	return answer
}
