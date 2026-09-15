func minWindow(s string, t string) string {
	if len(t) == 0 || len(t) > len(s) {
		return ""
	}
	// need[c] = copies of c the window still owes; missing = total owed
	// instances, so missing == 0 is an O(1) coverage test.
	need := make(map[byte]int)
	for i := 0; i < len(t); i++ {
		need[t[i]]++
	}
	missing := len(t)
	bestStart, bestLen := 0, -1
	left := 0
	for right := 0; right < len(s); right++ {
		ch := s[right]
		// need > 0 means this occurrence is genuinely required; the
		// unconditional decrement then drives surplus copies negative
		// without ever touching missing again.
		if need[ch] > 0 {
			missing--
		}
		need[ch]--
		if missing == 0 {
			// Valid window: shed surplus leftmost characters, returning
			// each released copy to the budget, until one sits at quota.
			for left < right && need[s[left]] < 0 {
				need[s[left]]++
				left++
			}
			if bestLen == -1 || right-left+1 < bestLen {
				bestStart = left
				bestLen = right - left + 1
			}
			// Evict the leftmost required character on purpose so the
			// search owes exactly one instance and scanning can resume.
			need[s[left]]++
			missing++
			left++
		}
	}
	if bestLen == -1 {
		return ""
	}
	return s[bestStart : bestStart+bestLen]
}
