func prefixesDivBy5(nums []int) []bool {
	answer := make([]bool, len(nums))
	rem := 0
	for i, bit := range nums {
		rem = (rem*2 + bit) % 5
		answer[i] = rem == 0
	}
	return answer
}
