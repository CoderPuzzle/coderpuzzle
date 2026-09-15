func appendCharacters(s string, t string) int {
	// Match t from its start, scanning s once. Each time the current
	// characters agree, t advances; s advances on every step. The prefix
	// of t consumed this way is the longest one that is a subsequence of
	// s, so the unmatched tail of t is exactly what must be appended.
	i, j := 0, 0
	for i < len(s) && j < len(t) {
		if s[i] == t[j] {
			j++
		}
		i++
	}
	return len(t) - j
}
