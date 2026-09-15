func findNumbers(nums []int) int {
	// Each division by 10 sheds one digit; the step count is the digit
	// count. Even tallies are what we count.
	even := 0
	for _, value := range nums {
		digits := 0
		for value > 0 {
			value /= 10
			digits++
		}
		if digits%2 == 0 {
			even++
		}
	}
	return even
}
