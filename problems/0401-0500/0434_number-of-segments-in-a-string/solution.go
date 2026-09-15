// A segment starts exactly where a non-space character follows a space —
// or where the string itself begins — so counting segments is counting
// their first characters.
func countSegments(s string) int {
	count := 0
	// One left-to-right pass tests that boundary condition at every
	// position: leading, trailing, and repeated interior spaces never
	// register, and an empty string offers no position at all.
	for i := range s {
		if s[i] != ' ' && (i == 0 || s[i-1] == ' ') {
			count++
		}
	}
	return count
}
