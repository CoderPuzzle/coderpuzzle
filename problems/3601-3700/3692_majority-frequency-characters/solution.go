func majorityFrequencyGroup(s string) string {
	// Tally every occurrence into a fixed 26-slot table; the lowercase-
	// only input makes each index a plain offset from 'a'.
	var counts [26]int
	for _, ch := range s {
		counts[ch-'a']++
	}
	// Evaluate each candidate frequency's bucket and keep the largest
	// gathering of distinct characters; sweeping frequencies upward lets
	// ">=" hand size ties to the larger frequency, and the ascending slot
	// scan collects the winners already in lexicographic order.
	best := []rune{}
	for k := 1; k <= len(s); k++ {
		chars := []rune{}
		for i := 0; i < 26; i++ {
			if counts[i] == k {
				chars = append(chars, rune('a'+i))
			}
		}
		if len(chars) >= len(best) {
			best = chars
		}
	}
	return string(best)
}
