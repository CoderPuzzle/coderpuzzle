// Repeated division by k peels off one base-k digit at a time; the digits
// arrive least-significant first but summing is order-free.
func sumBase(n int, k int) int {
	total := 0
	for n > 0 {
		total += n % k
		n /= k
	}
	return total
}
