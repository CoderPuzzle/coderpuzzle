// One alphabet serves both bases: base 16 stops at 'F', base 36 at 'Z'.
func concatHex36(n int) string {
	return toBase(n*n, 16) + toBase(n*n*n, 36)
}

func toBase(x int, b int) string {
	const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	// n >= 1 makes x >= 1, so the loop always emits at least one digit.
	digits := make([]byte, 0, 8)
	for x != 0 {
		digits = append(digits, alphabet[x%b])
		x /= b
	}
	// Digits come out lowest-first, so reverse for the answer.
	for lo, hi := 0, len(digits)-1; lo < hi; lo, hi = lo+1, hi-1 {
		digits[lo], digits[hi] = digits[hi], digits[lo]
	}
	return string(digits)
}
