// Peel digits from the right: n % 10 is the last digit, n / 10 discards
// it. Product and sum absorb each digit as it comes off.
func subtractProductAndSum(n int) int {
	product, total := 1, 0
	for ; n > 0; n /= 10 {
		digit := n % 10
		product *= digit
		total += digit
	}
	return product - total
}
