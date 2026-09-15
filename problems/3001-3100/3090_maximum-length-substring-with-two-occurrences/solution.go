// A sliding window keeps one count per letter and grows monotonically:
// each right step extends the window, and the left edge only ever moves
// forward to restore the two-occurrence budget.
func maximumLengthSubstring(s string) int {
	var counts [26]int
	best := 0
	left := 0
	for right := 0; right < len(s); right++ {
		index := int(s[right] - 'a')
		counts[index]++
		// Only the just-extended letter can be over budget, so the window
		// never has to shrink past its first offender.
		for counts[index] > 2 {
			counts[int(s[left]-'a')]--
			left++
		}
		if span := right - left + 1; span > best {
			best = span
		}
	}
	return best
}
