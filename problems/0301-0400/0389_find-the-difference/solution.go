// Every letter of s reappears somewhere in t, so folding both strings
// into one XOR accumulator cancels each shuffled pair and leaves only
// the added letter's code.
func findTheDifference(s string, t string) string {
	code := 0
	for i := range s {
		code ^= int(s[i])
	}
	for i := range t {
		code ^= int(t[i])
	}
	return string(rune(code))
}
