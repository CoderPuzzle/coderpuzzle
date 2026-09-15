func checkDivisibility(n int) bool {
	total, product := 0, 1
	for rest := n; rest > 0; rest /= 10 {
		digit := rest % 10
		total += digit
		product *= digit
	}
	// Digit sum >= 1 always, so the divisor never hits zero.
	return n%(total+product) == 0
}
