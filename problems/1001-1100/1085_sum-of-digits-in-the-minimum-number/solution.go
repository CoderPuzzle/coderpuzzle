func sumOfDigits(nums []int) int {
	// The answer depends only on the smallest element; sum its digits by
	// peeling off the least significant digit one at a time.
	m := nums[0]
	for _, v := range nums[1:] {
		if v < m {
			m = v
		}
	}
	digitSum := 0
	for m > 0 {
		digitSum += m % 10
		m /= 10
	}
	if digitSum%2 != 0 {
		return 0
	}
	return 1
}
