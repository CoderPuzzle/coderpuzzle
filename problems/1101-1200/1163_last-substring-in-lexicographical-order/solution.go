func lastSubstring(s string) string {
	n := len(s)
	// the answer is always a suffix: i = best start so far, j = challenger,
	// k = length of the prefix the two candidates agree on
	i, j, k := 0, 1, 0
	for j+k < n {
		if s[i+k] == s[j+k] {
			// characters agree: the shared prefix grows by one
			k++
		} else if s[i+k] < s[j+k] {
			// s[i:] loses here, and so does every suffix starting in
			// (i, i+k] — each hits the same losing comparison shifted
			i2 := i + k + 1
			if j > i2 {
				i2 = j
			}
			i = i2
			j = i + 1
			k = 0
		} else {
			// challenger loses: suffixes j..j+k are dominated, skip them
			j = j + k + 1
			k = 0
		}
	}
	return s[i:]
}
