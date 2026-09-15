func maxDistinctStarts(s string) int {
	// A piece is decided by its start: scanning left to right, the current
	// letter may open a new piece exactly when no earlier piece already
	// started with it. Accepting it costs only that one letter's
	// availability, and each letter starts at most one piece anyway, so the
	// greedy never blocks a better split.
	var seen [26]bool
	for i := 0; i < len(s); i++ {
		seen[s[i]-'a'] = true
	}
	count := 0
	for _, used := range seen {
		if used {
			count++
		}
	}
	return count
}
