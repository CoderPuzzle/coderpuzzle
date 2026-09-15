func lengthOfLongestSubstringKDistinct(s string, k int) int {
	// counts holds the multiplicities inside the window [left, right];
	// erasing a key at zero keeps len(counts) = distinct characters.
	counts := make(map[byte]int)
	left := 0
	best := 0
	for right := 0; right < len(s); right++ {
		counts[s[right]]++
		// Shrink until valid: every superset of an invalid window is
		// invalid too, so shrinking from the left skips no candidate.
		for len(counts) > k {
			c := s[left]
			counts[c]--
			if counts[c] == 0 {
				delete(counts, c)
			}
			left++
		}
		// Now the longest valid window ending at right is in hand.
		if right-left+1 > best {
			best = right - left + 1
		}
	}
	return best
}
