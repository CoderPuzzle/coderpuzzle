func uniqueLetterString(s string) int {
	// Reorganize the sum per occurrence: a letter adds 1 exactly
	// for substrings in which it appears precisely once. Bucket
	// the indices of each letter.
	positions := make([][]int, 26)
	for i := 0; i < 26; i++ {
		positions[i] = []int{}
	}
	for i := 0; i < len(s); i++ {
		c := int(s[i]) - 'A'
		positions[c] = append(positions[c], i)
	}
	n := len(s)
	total := 0
	for _, list := range positions {
		if len(list) == 0 {
			continue
		}
		// Sentinels -1 and n give the first and last occurrences
		// the same window arithmetic.
		pos := make([]int, 0, len(list)+2)
		pos = append(pos, -1)
		pos = append(pos, list...)
		pos = append(pos, n)
		for k := 1; k < len(pos)-1; k++ {
			// i-p left endpoints after the previous equal letter,
			// q-i right endpoints before the next: each
			// (substring, unique char) pair counted exactly once.
			total += (pos[k] - pos[k-1]) * (pos[k+1] - pos[k])
		}
	}
	return total
}
