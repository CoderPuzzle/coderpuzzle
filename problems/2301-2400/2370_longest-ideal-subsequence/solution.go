func longestIdealString(s string, k int) int {
	// best[c] = longest ideal subsequence so far ending with letter c.
	// Each character extends the best chain among letters within +/-k;
	// the window is at most 51 wide, so each step is constant time.
	best := make([]int, 26)
	for _, ch := range s {
		c := int(ch - 'a')
		lo := c - k
		if lo < 0 {
			lo = 0
		}
		hi := c + k
		if hi > 25 {
			hi = 25
		}
		candidate := 0
		for d := lo; d <= hi; d++ {
			if best[d] > candidate {
				candidate = best[d]
			}
		}
		if candidate+1 > best[c] {
			best[c] = candidate + 1
		}
	}
	answer := 0
	for _, v := range best {
		if v > answer {
			answer = v
		}
	}
	return answer
}
