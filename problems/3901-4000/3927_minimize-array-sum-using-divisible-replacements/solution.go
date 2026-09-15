func minArraySum(nums []int) int64 {
	limit := 100000
	present := make([]bool, limit+1)
	for _, value := range nums {
		present[value] = true
	}

	best := make([]int, limit+1)
	for divisor := 1; divisor <= limit; divisor++ {
		if !present[divisor] {
			continue
		}
		for multiple := divisor; multiple <= limit; multiple += divisor {
			if present[multiple] && (best[multiple] == 0 || divisor < best[multiple]) {
				best[multiple] = divisor
			}
		}
	}

	var answer int64
	for _, value := range nums {
		answer += int64(best[value])
	}
	return answer
}
