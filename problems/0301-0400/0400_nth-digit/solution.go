import "strconv"

func findNthDigit(n int) int {
	// The sequence splits into blocks by digit length: the 1-digit
	// numbers contribute 9 digits, the 2-digit numbers 180, the
	// 3-digit numbers 2700 — the d-digit block contributes
	// 9 * 10^(d-1) * d. Subtract whole blocks until n lands inside
	// block d, whose numbers start at 10^(d-1); the digit then
	// belongs to base + (n - 1) / d, at offset (n - 1) % d inside it.
	remaining := int64(n)
	digits := int64(1)
	base := int64(1)
	block := int64(9)
	for remaining > block {
		remaining -= block
		digits++
		base *= 10
		block = 9 * base * digits
	}
	number := base + (remaining-1)/digits
	return int(strconv.FormatInt(number, 10)[(remaining-1)%digits] - '0')
}
