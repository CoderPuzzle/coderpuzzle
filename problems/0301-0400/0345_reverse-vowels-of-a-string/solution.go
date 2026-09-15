import "strings"

// Go strings are immutable, so the scan runs on a byte slice — the honest
// equivalent of the in-place algorithm. Two pointers walk inward and only
// vowel positions are ever written.
func reverseVowels(s string) string {
	const vowels = "aeiouAEIOU"
	chars := []byte(s)
	lo, hi := 0, len(chars)-1
	for lo < hi {
		// Advance whichever side does not sit on a vowel.
		if !strings.ContainsRune(vowels, rune(chars[lo])) {
			lo++
		} else if !strings.ContainsRune(vowels, rune(chars[hi])) {
			hi--
		} else {
			// Both ends hold a vowel: swap them and step both inward.
			chars[lo], chars[hi] = chars[hi], chars[lo]
			lo++
			hi--
		}
	}
	return string(chars)
}
