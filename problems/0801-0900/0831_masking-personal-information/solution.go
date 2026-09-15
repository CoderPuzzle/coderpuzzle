// The '@' sign only appears in emails, so finding it settles which of
// the two shapes the input is. An email answer keeps the name's first
// and last letters and everything from the '@' on, folds uppercase to
// lowercase by adding 32, and pins the name's middle to five asterisks;
// the name is at least two letters, so even "ab" wears the full five.
// A phone answer needs only the digits: ten of them form the bare local
// number, and each digit beyond ten contributes one masked asterisk
// behind a '+', ahead of the shared "***-***-" tail and the last four
// digits.
func maskPII(s string) string {
	at := -1
	for i := 0; i < len(s); i++ {
		if s[i] == '@' {
			at = i
			break
		}
	}
	out := make([]byte, 0, len(s)+6)
	if at >= 0 {
		for i := 0; i < len(s); i++ {
			// Position 1 opens the fixed five-asterisk middle; the
			// name's first and last letters and the whole domain
			// are the only characters kept.
			if i == 1 {
				out = append(out, "*****"...)
			}
			if i == 0 || i >= at-1 {
				c := s[i]
				if c >= 'A' && c <= 'Z' {
					c += 32
				}
				out = append(out, c)
			}
		}
	} else {
		digits := make([]byte, 0, 13)
		for i := 0; i < len(s); i++ {
			if s[i] >= '0' && s[i] <= '9' {
				digits = append(digits, s[i])
			}
		}
		// Every digit past ten is one masked country-code star.
		if len(digits) > 10 {
			out = append(out, '+')
			for i := 10; i < len(digits); i++ {
				out = append(out, '*')
			}
			out = append(out, '-')
		}
		out = append(out, "***-***-"...)
		out = append(out, digits[len(digits)-4:]...)
	}
	return string(out)
}
