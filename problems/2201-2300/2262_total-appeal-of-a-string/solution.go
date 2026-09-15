func appealSum(s string) int64 {
	// flip the accounting: per character, count the substrings containing it
	last := make([]int, 26)
	// -1 = not yet seen, so i - last[c] counts all i + 1 possible starts
	for i := range last {
		last[i] = -1
	}
	// current = total appeal of all substrings ending at i
	var total, current int64
	for i := 0; i < len(s); i++ {
		c := int(s[i] - 'a')
		// s[i] is newly counted in the substrings starting after its previous
		// occurrence
		current += int64(i - last[c])
		last[c] = i
		// each substring is charged once per distinct char it contains: its appeal
		total += current
	}
	return total
}
