func longestSubstring(s string, k int) int {
	best := 0
	// Every qualifying window holds between 1 and 26 distinct letters. Pin
	// that count as a budget and the window rule -- no more than budget
	// distinct letters -- becomes one two pointers can maintain.
	for budget := 1; budget <= 26; budget++ {
		var counts [128]int
		distinct := 0
		qualified := 0
		left := 0
		sweepBest := 0
		for right := 0; right < len(s); right++ {
			ch := s[right]
			if counts[ch] == 0 {
				distinct++
			}
			counts[ch]++
			if counts[ch] == k {
				qualified++
			}
			// Growing a window never lowers its letter variety, so once
			// the window busts the budget only shrinking repairs it: left
			// advances monotonically and never backtracks.
			for distinct > budget {
				drop := s[left]
				left++
				if counts[drop] == k {
					qualified--
				}
				counts[drop]--
				if counts[drop] == 0 {
					distinct--
				}
			}
			// qualified never exceeds distinct, which never exceeds the
			// budget, so reaching the budget means exactly budget letters
			// are present and each has reached k. A letter rarer than k
			// across the whole string never joins qualified, so windows
			// relying on it stay unrecorded.
			if qualified == budget && right-left+1 > sweepBest {
				sweepBest = right - left + 1
			}
		}
		if sweepBest > best {
			best = sweepBest
		}
	}
	return best
}
