func largestInteger(n int, s int) int {
	if s > 9*n {
		return -1
	}
	if s == 0 {
		return 0
	}
	answer := 0
	for i := 0; i < n; i++ {
		digit := min(9, s)
		answer = answer*10 + digit
		s -= digit
	}
	return answer
}
