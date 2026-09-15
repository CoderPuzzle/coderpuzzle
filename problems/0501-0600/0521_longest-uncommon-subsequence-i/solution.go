// Identical strings have identical subsequence sets, so no string can be a
// subsequence of exactly one of them.
func findLUSlength(a string, b string) int {
	if a == b {
		return -1
	}
	// Otherwise the longer string itself is the witness: every string is a
	// subsequence of itself, and a longer one cannot hide inside a shorter.
	if len(a) > len(b) {
		return len(a)
	}
	return len(b)
}
