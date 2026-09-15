// While both ends carry the same character, consume its full run on
// each side in one sweep. The process is forced: shorter strips only
// delay the same end state.
func minimumLength(s string) int {
	l, r := 0, len(s)-1
	for l < r && s[l] == s[r] {
		c := s[l]
		for l <= r && s[l] == c {
			l++
		}
		for r >= l && s[r] == c {
			r--
		}
	}
	return r - l + 1
}
