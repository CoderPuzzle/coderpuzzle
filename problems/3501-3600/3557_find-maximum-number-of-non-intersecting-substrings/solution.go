func maxSubstrings(word string) int {
	// Substrings may not share an index, so this is interval scheduling:
	// taking the earliest-finishing valid substring at each step can
	// never push a later choice further right. Scan once, remember each
	// letter's first index inside the current window, and when the
	// running index reaches 3 past it, take that substring and restart
	// the window just past its end.
	first := make([]int, 26)
	for i := range first {
		first[i] = -1
	}
	count := 0
	for i := 0; i < len(word); i++ {
		c := word[i] - 'a'
		if first[c] < 0 {
			first[c] = i
		}
		if i-first[c] >= 3 {
			count++
			for j := range first {
				first[j] = -1
			}
		}
	}
	return count
}
