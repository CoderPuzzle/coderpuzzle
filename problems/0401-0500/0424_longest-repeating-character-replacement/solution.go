func characterReplacement(s string, k int) int {
	// A window is fixable with k changes iff length - (count of its most
	// frequent char) <= k: the non-majority chars are what get replaced.
	count := make([]int, 128)
	best, left, maxFreq := 0, 0, 0
	for right := 0; right < len(s); right++ {
		c := s[right]
		count[c]++
		// maxFreq is only raised, never lowered: a stale high value can
		// merely under-shrink, and each new longest window really contains
		// the char that set it, so validity is preserved.
		if count[c] > maxFreq {
			maxFreq = count[c]
		}
		// Shrink from the left until the window fits the budget again.
		for (right-left+1)-maxFreq > k {
			count[s[left]]--
			left++
		}
		if right-left+1 > best {
			best = right - left + 1
		}
	}
	return best
}
