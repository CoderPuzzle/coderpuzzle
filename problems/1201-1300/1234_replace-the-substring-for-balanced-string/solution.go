func balancedString(s string) int {
	n := len(s)
	target := n / 4
	// Surplus letters are the only ones the window must cover.
	var total [128]int
	for i := 0; i < n; i++ {
		total[s[i]]++
	}
	var need [128]int
	kinds := 0
	for c := 'A'; c <= 'Z'; c++ {
		if total[c] > target {
			need[c] = total[c] - target
			kinds++
		}
	}
	if kinds == 0 {
		return 0
	}
	var window [128]int
	served, best, left := 0, n, 0
	for right := 0; right < n; right++ {
		ch := s[right]
		if need[ch] > 0 {
			window[ch]++
			if window[ch] == need[ch] {
				served++
			}
		}
		for served == kinds {
			if right-left+1 < best {
				best = right - left + 1
			}
			leftCh := s[left]
			if need[leftCh] > 0 {
				if window[leftCh] == need[leftCh] {
					served--
				}
				window[leftCh]--
			}
			left++
		}
	}
	return best
}
