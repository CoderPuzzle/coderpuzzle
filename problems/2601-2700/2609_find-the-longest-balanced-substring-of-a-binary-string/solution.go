func findTheLongestBalancedSubstring(s string) int {
	// One pass with two run counters: `zeros` is the length of the zero
	// block currently ending (reset when a fresh block starts after ones),
	// `ones` is the running tail of consecutive ones. A balanced substring
	// is always a prefix-tail pairing min(zeros, ones) of both, so every
	// one seen offers 2 * min as a candidate answer.
	best, zeros, ones := 0, 0, 0
	prev := byte(' ')
	for i := 0; i < len(s); i++ {
		ch := s[i]
		if ch == '0' {
			if prev == '0' {
				zeros++
			} else {
				zeros = 1
			}
			ones = 0
		} else {
			ones++
			if cand := 2 * min(zeros, ones); cand > best {
				best = cand
			}
		}
		prev = ch
	}
	return best
}
