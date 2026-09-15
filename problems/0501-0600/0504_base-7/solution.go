// The magnitude is what gets divided; the sign travels separately and is
// prepended once the digits are settled.
func convertToBase7(num int) string {
	// Zero never enters the digit loop, so it gets its own answer here.
	if num == 0 {
		return "0"
	}
	negative := num < 0
	value := num
	if negative {
		value = -value
	}
	digits := make([]byte, 0, 10)
	for value != 0 {
		// Split off the low base-7 digit, then shift the rest down.
		digits = append(digits, byte('0'+value%7))
		value /= 7
	}
	if negative {
		digits = append(digits, '-')
	}
	// Digits come out lowest-first, so reverse for the answer.
	for lo, hi := 0, len(digits)-1; lo < hi; lo, hi = lo+1, hi-1 {
		digits[lo], digits[hi] = digits[hi], digits[lo]
	}
	return string(digits)
}
