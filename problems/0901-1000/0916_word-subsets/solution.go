// counts fills one slot per letter: "aba" -> [2, 1, 0, ...].
func counts(s string) [26]int {
	var c [26]int
	for i := 0; i < len(s); i++ {
		c[s[i]-'a']++
	}
	return c
}

// dominates reports whether have covers need in every slot.
func dominates(have, need [26]int) bool {
	for i := range have {
		if have[i] < need[i] {
			return false
		}
	}
	return true
}

func wordSubsets(words1 []string, words2 []string) []string {
	// Collapse words2 to a single requirement vector: per letter, the max
	// count any one b demands. Covering the max covers every b, because
	// each b is checked independently by the definition.
	var need [26]int
	for _, b := range words2 {
		cb := counts(b)
		for i := range need {
			if cb[i] > need[i] {
				need[i] = cb[i]
			}
		}
	}

	// A word is universal iff its counts dominate the collapsed demand
	// everywhere; survivors keep their input order.
	universal := make([]string, 0, len(words1))
	for _, a := range words1 {
		if dominates(counts(a), need) {
			universal = append(universal, a)
		}
	}
	return universal
}
