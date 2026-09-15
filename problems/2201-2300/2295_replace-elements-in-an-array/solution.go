func arrayChange(nums []int, operations [][]int) []int {
	const maxValue = 1000000
	finalName := make([]int, maxValue+1)
	for value := range finalName {
		finalName[value] = -1
	}
	for index := len(operations) - 1; index >= 0; index-- {
		replaced := operations[index][0]
		replacement := operations[index][1]
		if finalName[replacement] != -1 {
			finalName[replaced] = finalName[replacement]
		} else {
			finalName[replaced] = replacement
		}
	}
	answer := append([]int(nil), nums...)
	for index, value := range answer {
		if finalName[value] != -1 {
			answer[index] = finalName[value]
		}
	}
	return answer
}
