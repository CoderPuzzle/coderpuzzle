func differenceOfSum(nums []int) int {
	// One pass accumulates both sums at once; every element is at least
	// its own digit sum (equality only for single digits), and the
	// bounds (2000 elements of at most 2000) keep both totals inside
	// int, so one subtraction closes the case.
	elementSum, digitSum := 0, 0
	for _, value := range nums {
		elementSum += value
		for value > 0 {
			digitSum += value % 10
			value /= 10
		}
	}
	if elementSum >= digitSum {
		return elementSum - digitSum
	}
	return digitSum - elementSum
}
