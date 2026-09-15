func expressiveWords(s string, words []string) int {
	// Run-length encode s once: its letter spine is what every stretchy
	// word must reproduce, group by group.
	letters := make([]byte, 0, len(s))
	counts := make([]int, 0, len(s))
	for i := 0; i < len(s); {
		j := i
		for j < len(s) && s[j] == s[i] {
			j++
		}
		letters = append(letters, s[i])
		counts = append(counts, j-i)
		i = j
	}
	count := 0
	for _, w := range words {
		// Walk w's own groups against s's: same letters, same group
		// count, and per group either equal counts or an s-side count
		// of 3 or more strictly above the word's.
		ok := true
		gi, k := 0, 0
		for k < len(w) {
			j := k
			for j < len(w) && w[j] == w[k] {
				j++
			}
			if gi == len(letters) || letters[gi] != w[k] {
				ok = false
				break
			}
			sCount, wCount := counts[gi], j-k
			if sCount != wCount && !(sCount >= 3 && sCount > wCount) {
				ok = false
				break
			}
			gi++
			k = j
		}
		// The walk must end in lockstep with s's spine.
		if ok && gi == len(letters) {
			count++
		}
	}
	return count
}
