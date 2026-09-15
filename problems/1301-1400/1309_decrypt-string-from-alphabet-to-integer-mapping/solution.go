func freqAlphabets(s string) string {
	// A '#' disambiguates backwards, so scan from the right: at each position
	// either a '#' sits two places ahead (three-char token) or the digit
	// stands alone as a single letter.
	out := make([]byte, 0, len(s))
	i := len(s) - 1
	for i >= 0 {
		var value int
		if s[i] == '#' {
			value = int(s[i-2]-'0')*10 + int(s[i-1]-'0')
			i -= 3
		} else {
			value = int(s[i] - '0')
			i--
		}
		out = append(out, byte('a'+value-1))
	}
	for a, b := 0, len(out)-1; a < b; a, b = a+1, b-1 {
		out[a], out[b] = out[b], out[a]
	}
	return string(out)
}
