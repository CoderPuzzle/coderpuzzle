func partitionLabels(s string) []int {
	// A part must extend to the last occurrence of every letter it
	// contains, so record where each letter finally appears.
	var last [26]int
	for i := range last {
		last[i] = -1
	}
	for i := 0; i < len(s); i++ {
		last[s[i]-'a'] = i
	}
	parts := []int{}
	start, end := 0, 0
	for i := 0; i < len(s); i++ {
		// end = farthest last occurrence among letters opened so far.
		if last[s[i]-'a'] > end {
			end = last[s[i]-'a']
		}
		// i == end: every letter opened in this span also closes in
		// it, so a cut here is legal.
		if i == end {
			parts = append(parts, end-start+1)
			start = i + 1
		}
	}
	return parts
}
