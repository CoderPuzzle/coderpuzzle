func generateKey(num1 int, num2 int, num3 int) int {
	// Digit i of the key is the minimum of the three numbers' ith digits,
	// counted from the left of their zero-padded four-digit forms; the
	// integer result drops any leading zeros by construction.
	key := 0
	for place := 1000; place > 0; place /= 10 {
		digit := num1 / place % 10
		if v := num2 / place % 10; v < digit {
			digit = v
		}
		if v := num3 / place % 10; v < digit {
			digit = v
		}
		key = key*10 + digit
	}
	return key
}
