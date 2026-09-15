// signature indexes each letter of s by the position class of its first
// appearance: "abb" -> [0, 1, 1].
func signature(s string) []int {
	first := make(map[byte]int)
	sig := make([]int, 0, len(s))
	for i := 0; i < len(s); i++ {
		c := s[i]
		if _, ok := first[c]; !ok {
			first[c] = len(first)
		}
		sig = append(sig, first[c])
	}
	return sig
}

func equal(a, b []int) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

func findAndReplacePattern(words []string, pattern string) []string {
	// Equal signatures are exactly bijective matchability for
	// equal-length strings, so no letter-to-letter maps are needed.
	target := signature(pattern)
	matches := make([]string, 0, len(words))
	for _, w := range words {
		if equal(signature(w), target) {
			matches = append(matches, w)
		}
	}
	return matches
}
