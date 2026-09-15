func numMatchingSubseq(s string, words []string) int {
	type entry struct {
		wi int // word index
		ni int // next index in word
	}
	// Bucket each word by the next character it waits for: stream s
	// once and advance every word waiting on the arriving character.
	var waiting [26][]entry
	count := 0
	for wi, w := range words {
		// Empty words match trivially (defensive; constraints say
		// non-empty).
		if len(w) == 0 {
			count++
		} else {
			waiting[w[0]-'a'] = append(waiting[w[0]-'a'], entry{wi, 1})
		}
	}
	for i := 0; i < len(s); i++ {
		c := s[i] - 'a'
		// Take the bucket so re-filed entries are not reprocessed
		// within this step.
		its := waiting[c]
		waiting[c] = nil
		// The greedy subsequence check, distributed: a matched word
		// either completes or waits on its next character, and each
		// pointer only moves forward.
		for _, e := range its {
			w := words[e.wi]
			if e.ni == len(w) {
				count++
			} else {
				waiting[w[e.ni]-'a'] = append(waiting[w[e.ni]-'a'], entry{e.wi, e.ni + 1})
			}
		}
	}
	return count
}
