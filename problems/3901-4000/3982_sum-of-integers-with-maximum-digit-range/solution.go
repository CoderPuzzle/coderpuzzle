func maxDigitRange(nums []int) int64 {
	ranges := make([]int, len(nums))
	maximum := 0
	for i, value := range nums {
		remaining := value
		low := 9
		high := 0
		for remaining > 0 {
			digit := remaining % 10
			if digit < low {
				low = digit
			}
			if digit > high {
				high = digit
			}
			remaining /= 10
		}
		ranges[i] = high - low
		if ranges[i] > maximum {
			maximum = ranges[i]
		}
	}
	var answer int64
	for i, value := range nums {
		if ranges[i] == maximum {
			answer += int64(value)
		}
	}
	return answer
}
