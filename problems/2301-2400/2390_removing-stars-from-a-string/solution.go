func removeStars(s string) string {
	// A star deletes the most recently kept character, so keep a stack
	// of survivors: push letters, pop on stars.
	kept := make([]byte, 0, len(s))
	for i := 0; i < len(s); i++ {
		if s[i] == '*' {
			kept = kept[:len(kept)-1]
		} else {
			kept = append(kept, s[i])
		}
	}
	return string(kept)
}
