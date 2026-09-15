// Greedy two pointers with one remembered star: every '*' is first matched to
// the empty run, and a later mismatch backtracks to the most recent star and
// lets it absorb one more character of s.
func isMatch(s string, p string) bool {
	n, m := len(s), len(p)
	si, pi := 0, 0
	star, restart := -1, 0
	for si < n {
		if pi < m && (p[pi] == '?' || p[pi] == s[si]) {
			si++
			pi++
		} else if pi < m && p[pi] == '*' {
			// Provisional choice: the star matches nothing yet.
			star = pi
			restart = si
			pi++
		} else if star != -1 {
			// Mismatch after a star: the star absorbs one more character
			// of s, and the pattern replays from just after it.
			restart++
			si = restart
			pi = star + 1
		} else {
			return false
		}
	}
	// Only trailing stars can still match the empty remainder of s.
	for pi < m && p[pi] == '*' {
		pi++
	}
	return pi == m
}
