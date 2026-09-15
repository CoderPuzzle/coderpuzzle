// The smallest matching index can never sit past the middle: once i exceeds
// n-1-i the pair is a repeat of one already tested. Scan the outward-in
// pairs from index 0 and return the first equal one.
func firstMatchingIndex(s string) int {
	n := len(s)
	for i := 0; i < (n+1)/2; i++ {
		if s[i] == s[n-1-i] {
			return i
		}
	}
	return -1
}
