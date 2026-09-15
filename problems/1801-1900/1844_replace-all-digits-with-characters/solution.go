// shift(c, x) is plain character arithmetic: c + x. Each digit at an odd
// index pairs with the letter immediately before it.
func replaceDigits(s string) string {
	chars := []byte(s)
	for i := 1; i < len(chars); i += 2 {
		chars[i] = chars[i-1] + (chars[i] - '0')
	}
	return string(chars)
}
