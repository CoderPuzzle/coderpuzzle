func checkGoodInteger(n int) bool {
	digitSum := 0
	squareSum := 0
	for n > 0 {
		digit := n % 10
		digitSum += digit
		squareSum += digit * digit
		n /= 10
	}
	return squareSum-digitSum >= 50
}
