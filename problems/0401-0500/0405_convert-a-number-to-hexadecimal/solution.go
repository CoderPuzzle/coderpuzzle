// The uint32 conversion wraps modulo 2^32: a negative num becomes its
// two's-complement bit pattern, and uint32 shifts are logical.
func toHex(num int) string {
	// Zero never enters the nibble loop, so it gets its own answer here.
	if num == 0 {
		return "0"
	}
	value := uint32(num)
	const alphabet = "0123456789abcdef"
	digits := make([]byte, 0, 8)
	for value != 0 {
		// Take the low nibble, then shift the rest down by one digit.
		digits = append(digits, alphabet[value&0xF])
		value >>= 4
	}
	// Nibbles come out lowest-first, so reverse for the answer.
	for lo, hi := 0, len(digits)-1; lo < hi; lo, hi = lo+1, hi-1 {
		digits[lo], digits[hi] = digits[hi], digits[lo]
	}
	return string(digits)
}
