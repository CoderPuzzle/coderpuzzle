func vowelConsonantScore(s string) int {
	// One pass tallies both totals: each character either is one of
	// the five vowels and bumps v, is another lowercase letter and
	// bumps c, or is a space or digit and bumps neither. The score is
	// then the integer quotient floor(v / c), or 0 when no consonant
	// exists to divide by.
	v := 0
	c := 0
	for _, ch := range s {
		if ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u' {
			v++
		} else if ch >= 'a' && ch <= 'z' {
			c++
		}
	}
	if c == 0 {
		return 0
	}
	return v / c
}
