// The statement's own process, carried out literally: while the value has
// more than one digit, replace it by the sum of its digits.
func addDigits(num int) int {
	for num >= 10 {
		// One round: peel digits off the low end into a running sum.
		total := 0
		for value := num; value > 0; value /= 10 {
			total += value % 10
		}
		num = total
	}
	return num
}
