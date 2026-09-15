func findLUSlength(strs []string) int {
	// A string can only win as itself: if any other string contains it as
	// a subsequence, every subsequence it could offer is common to both,
	// and equal duplicates contain each other, so both are disqualified.
	best := -1
	for i, s := range strs {
		contained := false
		for j, t := range strs {
			if i == j {
				continue
			}
			// Two-pointer scan: walk t once, advancing in s whenever the
			// next character matches; s is a subsequence of t iff all
			// of s was consumed.
			at := 0
			for k := 0; k < len(t) && at < len(s); k++ {
				if s[at] == t[k] {
					at++
				}
			}
			if at == len(s) {
				contained = true
				break
			}
		}
		if !contained && len(s) > best {
			best = len(s)
		}
	}
	return best
}
