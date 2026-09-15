// A character is non-repeating exactly when it occurs once in the whole
// string — a global fact no prefix can settle — so the first pass tallies
// occurrences, one slot per letter of the alphabet.
func firstUniqChar(s string) int {
	var counts [26]int
	for i := range s {
		counts[s[i]-'a']++
	}
	// The second pass scans in index order for the first slot reading
	// exactly 1 — scanning left to right is what answers "first" — and
	// reaching the end without a hit means -1.
	for i := range s {
		if counts[s[i]-'a'] == 1 {
			return i
		}
	}
	return -1
}
