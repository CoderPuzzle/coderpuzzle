// A sentence is a pangram exactly when its set of distinct characters is
// the whole lowercase alphabet, so collect the distinct characters and
// compare the set's size with 26.
func checkIfPangram(sentence string) bool {
	seen := make(map[rune]struct{})
	for _, c := range sentence {
		seen[c] = struct{}{}
		if len(seen) == 26 {
			return true
		}
	}
	return false
}
