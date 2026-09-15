func numberOfSpecialSubstrings(s string) int64 {
	// last[c] is the most recent index of c; left is the smallest window
	// start keeping s[left:i+1] free of repeating characters.
	last := make([]int, 26)
	for c := range last {
		last[c] = -1
	}
	left, ans := 0, int64(0)
	for i := 0; i < len(s); i++ {
		c := s[i] - 'a'
		// An occurrence left of the window yields last[c]+1 <= left, so
		// stale entries leave the window untouched.
		if last[c]+1 > left {
			left = last[c] + 1
		}
		// Every start in [left..i] ends a special substring at i.
		ans += int64(i - left + 1)
		last[c] = i
	}
	return ans
}
