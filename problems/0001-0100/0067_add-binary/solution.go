// Schoolbook binary addition: two indexes walk in from the right ends while
// a running carry ripples left, and the digits come out least-significant
// first into a buffer that is reversed once at the end.
func addBinary(a string, b string) string {
	// Walk both strings from their right ends, adding the way
	// pencil-and-paper binary addition does: one digit from each input plus
	// the carry in, one result digit and a new carry out.
	i, j, carry := len(a)-1, len(b)-1, 0
	// The result has at most max(len(a), len(b)) + 1 digits, which
	// len(a) + len(b) always covers.
	digits := make([]byte, 0, len(a)+len(b))
	// Running while either input has digits left or a carry is pending
	// absorbs both uneven lengths (the shorter input just stops
	// contributing, no padding) and the final carry ("11" + "1" = "100")
	// with no special cases after the loop.
	for i >= 0 || j >= 0 || carry > 0 {
		total := carry
		if i >= 0 {
			total += int(a[i] - '0')
			i--
		}
		if j >= 0 {
			total += int(b[j] - '0')
			j--
		}
		// total is at most 3 (1 + 1 + carry), so its low bit is the result
		// digit and the rest is the next carry. Only single characters are
		// ever converted, never the whole strings, which is what the
		// follow-up asks for.
		digits = append(digits, byte('0'+total%2))
		carry = total / 2
	}
	// Digits were produced least-significant first; one reverse at the end
	// beats prepending each digit to the front.
	for lo, hi := 0, len(digits)-1; lo < hi; lo, hi = lo+1, hi-1 {
		digits[lo], digits[hi] = digits[hi], digits[lo]
	}
	return string(digits)
}
