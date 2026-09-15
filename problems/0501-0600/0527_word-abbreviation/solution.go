import "strconv"

func wordsAbbreviation(words []string) []string {
	// Every word starts at a one-letter prefix: first character, count of
	// the middle, last character. Abbreviations can only clash between
	// equal-length words sharing that prefix and their last letter, and the
	// cure is collective — every clashing group grows its prefix by one and
	// re-groups, until each abbreviation stands alone.
	prefix := make([]int, len(words))
	for i := range prefix {
		prefix[i] = 1
	}
	abbreviate := func(i int) string {
		word := words[i]
		p := prefix[i]
		return word[:p] + strconv.Itoa(len(word)-p-1) + word[len(word)-1:]
	}
	for {
		groups := make(map[string][]int)
		for i := range words {
			key := abbreviate(i)
			groups[key] = append(groups[key], i)
		}
		unique := true
		for _, ids := range groups {
			if len(ids) > 1 {
				unique = false
				for _, i := range ids {
					prefix[i]++
				}
			}
		}
		if unique {
			break
		}
	}
	result := make([]string, 0, len(words))
	for i := range words {
		abbr := abbreviate(i)
		// An abbreviation no shorter than the word itself buys nothing.
		if len(abbr) < len(words[i]) {
			result = append(result, abbr)
		} else {
			result = append(result, words[i])
		}
	}
	return result
}
