// Sliding window with a character count map. The map never holds more than
// two entries, so the window is always a valid substring and the answer is
// simply the largest width it ever reaches. s consists of English letters,
// so indexing its bytes is indexing its characters.
func lengthOfLongestSubstringTwoDistinct(s string) int {
	counts := map[byte]int{}
	best, left := 0, 0
	for right := 0; right < len(s); right++ {
		counts[s[right]]++
		// A third distinct character broke the rule: shrink from the left
		// until one character's count drains to zero and leaves the map.
		for len(counts) > 2 {
			leftmost := s[left]
			counts[leftmost]--
			if counts[leftmost] == 0 {
				delete(counts, leftmost)
			}
			left++
		}
		if width := right - left + 1; width > best {
			best = width
		}
	}
	return best
}
