func elementInNums(nums []int, queries [][]int) []int {
	length := len(nums)
	cycle := 2 * length
	answer := make([]int, len(queries))
	for queryIndex, query := range queries {
		phase := query[0] % cycle
		index := query[1]
		if phase < length {
			originalIndex := phase + index
			if originalIndex < length {
				answer[queryIndex] = nums[originalIndex]
			} else {
				answer[queryIndex] = -1
			}
		} else {
			restored := phase - length
			if index < restored {
				answer[queryIndex] = nums[index]
			} else {
				answer[queryIndex] = -1
			}
		}
	}
	return answer
}
