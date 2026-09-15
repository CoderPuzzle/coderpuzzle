func numberOfSubstrings(s string) int {
	// last occurrence of a/b/c so far; -1 = letter not seen yet
	last := []int{-1, -1, -1}
	count := 0
	for i := 0; i < len(s); i++ {
		idx := int(s[i]) - 'a'
		if idx >= 0 && idx <= 2 {
			last[idx] = i
		}
		// substring s[l..i] is valid iff l <= min(last): every such left
		// endpoint yields one valid substring ending at i (0 until all seen)
		m := last[0]
		if last[1] < m {
			m = last[1]
		}
		if last[2] < m {
			m = last[2]
		}
		count += m + 1
	}
	return count
}
