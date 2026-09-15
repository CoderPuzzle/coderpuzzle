// A window is valid exactly when its counts cover word2's counts. Track how
// many required characters are still `missing`; when it hits zero every
// extension r' >= r of the current right end works, contributing n - r
// windows for this left end. The minimal right end never decreases as l
// advances, so each character enters and leaves the window once — linear
// overall. The answer reaches ~n^2/2 = 5e11, so it is accumulated in an int64.
func validSubstringCount(word1 string, word2 string) int64 {
	n := len(word1)
	var need [26]int
	for i := 0; i < len(word2); i++ {
		need[word2[i]-'a']++
	}
	missing := 0
	for c := 0; c < 26; c++ {
		missing += need[c]
	}
	var have [26]int
	var total int64 = 0
	r := 0
	for l := 0; l < n; l++ {
		// Grow the window until it first covers word2.
		for r < n && missing > 0 {
			c := word1[r] - 'a'
			have[c]++
			if need[c] > 0 && have[c] <= need[c] {
				missing--
			}
			r++
		}
		if missing > 0 {
			// No window starting at l (or any later l) can cover word2.
			break
		}
		total += int64(n - (r - 1))
		// Drop word1[l] before moving to the next left end.
		c := word1[l] - 'a'
		have[c]--
		if need[c] > 0 && have[c] < need[c] {
			missing++
		}
	}
	return total
}
