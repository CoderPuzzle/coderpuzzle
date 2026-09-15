func mostCommonWord(paragraph string, banned []string) string {
	bannedSet := make(map[string]bool, len(banned))
	for _, word := range banned {
		bannedSet[word] = true
	}
	counts := make(map[string]int)
	bestWord := ""
	bestCount := 0
	// The trailing space closes a word still open when the paragraph
	// ends, so the loop never needs a separate flush.
	word := make([]byte, 0, 16)
	for _, c := range []byte(paragraph + " ") {
		// ASCII puts every uppercase letter 32 codes above its
		// lowercase twin, so one range check + 32 folds the case;
		// every other character matches neither range and cuts the
		// word instead of joining it.
		if c >= 'A' && c <= 'Z' {
			word = append(word, c+32)
		} else if c >= 'a' && c <= 'z' {
			word = append(word, c)
		} else if len(word) > 0 {
			end := string(word)
			word = word[:0]
			if !bannedSet[end] {
				counts[end]++
				// Strictly greater keeps the earlier word on equal
				// counts; the statement guarantees the answer is
				// unique, so no tie ever reaches this comparison.
				if counts[end] > bestCount {
					bestCount = counts[end]
					bestWord = end
				}
			}
		}
	}
	return bestWord
}
