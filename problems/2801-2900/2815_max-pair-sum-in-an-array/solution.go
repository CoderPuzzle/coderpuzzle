func maxSum(nums []int) int {
	bestByLargestDigit := map[int]int{}
	answer := -1
	for _, num := range nums {
		largestDigit := 0
		for value := num; value > 0; value /= 10 {
			if value%10 > largestDigit {
				largestDigit = value % 10
			}
		}
		if best, ok := bestByLargestDigit[largestDigit]; ok {
			if best+num > answer {
				answer = best + num
			}
			if num > best {
				bestByLargestDigit[largestDigit] = num
			}
		} else {
			bestByLargestDigit[largestDigit] = num
		}
	}
	return answer
}
