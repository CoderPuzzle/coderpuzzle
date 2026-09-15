func distinctEchoSubstrings(text string) int {
	n := len(text)
	// An echo is exactly an even-length substring whose two halves are
	// identical, so each one is characterized by a half length and a
	// start index — enumerate every such (half, i) pair.
	seen := map[string]bool{}
	for half := 1; half <= n/2; half++ {
		// Start positions with room for the full doubled substring.
		for i := 0; i+2*half <= n; i++ {
			// Direct half comparison: no non-echo can pass, and every
			// echo appears for exactly its own (half, i).
			if text[i:i+half] == text[i+half:i+2*half] {
				// The set silently discards repeats — equal substrings
				// hash/compare identically — so its size is the answer.
				seen[text[i:i+2*half]] = true
			}
		}
	}
	return len(seen)
}
