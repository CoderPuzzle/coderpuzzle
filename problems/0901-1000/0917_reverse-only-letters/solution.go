// Go strings are immutable, so the scan runs on a byte slice — the honest
// equivalent of the in-place algorithm. Two pointers walk inward and only
// letter positions are ever written.
func reverseOnlyLetters(s string) string {
	isLetter := func(c byte) bool {
		return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')
	}
	chars := []byte(s)
	lo, hi := 0, len(chars)-1
	for lo < hi {
		// Advance whichever side does not sit on a letter.
		if !isLetter(chars[lo]) {
			lo++
		} else if !isLetter(chars[hi]) {
			hi--
		} else {
			// Both ends hold a letter: swap them and step both inward.
			chars[lo], chars[hi] = chars[hi], chars[lo]
			lo++
			hi--
		}
	}
	return string(chars)
}
