func maximumSum(nums []int) int {
	bestByDigitSum := map[int]int{}
	answer := -1
	for _, num := range nums {
		digitSum := 0
		for value := num; value > 0; value /= 10 {
			digitSum += value % 10
		}
		if best, ok := bestByDigitSum[digitSum]; ok {
			if best+num > answer {
				answer = best + num
			}
			if num > best {
				bestByDigitSum[digitSum] = num
			}
		} else {
			bestByDigitSum[digitSum] = num
		}
	}
	return answer
}
