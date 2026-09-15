func longestSemiRepetitiveSubstring(s string) int {
	best := 0
	left := 0
	pairs := 0
	for right := 0; right < len(s); right++ {
		if right > 0 && s[right] == s[right-1] {
			pairs++
		}
		for pairs > 1 {
			if s[left] == s[left+1] {
				pairs--
			}
			left++
		}
		if window := right - left + 1; window > best {
			best = window
		}
	}
	return best
}
