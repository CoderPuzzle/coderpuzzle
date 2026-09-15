// One left-to-right scan over the grammar's skeleton: sign, mantissa
// (integer or decimal), optional exponent. seenDigit is scoped to the
// part being read — the mantissa first, then the exponent after the
// 'e'/'E' resets it.
func isNumber(s string) bool {
	seenDigit, seenDot, seenExp := false, false, false
	for i := 0; i < len(s); i++ {
		c := s[i]
		switch {
		case c >= '0' && c <= '9':
			seenDigit = true
		case c == '+' || c == '-':
			// A sign is legal only at the very start or right after 'e'/'E'.
			if i > 0 && s[i-1] != 'e' && s[i-1] != 'E' {
				return false
			}
		case c == '.':
			// At most one dot, and only in the mantissa: the exponent is an integer.
			if seenDot || seenExp {
				return false
			}
			seenDot = true
		case c == 'e' || c == 'E':
			// At most one exponent, and only after the mantissa has shown a digit.
			if seenExp || !seenDigit {
				return false
			}
			seenExp = true
			seenDigit = false
		default:
			// Any other character (every letter but e/E) is invalid.
			return false
		}
	}
	// The last part read must have contained at least one digit.
	return seenDigit
}
