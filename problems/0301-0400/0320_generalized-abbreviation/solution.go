import "strconv"

func generateAbbreviations(word string) []string {
	// Each position doubles the possibilities: fold the character into the
	// running count, or keep the letter and flush the count first. The
	// abbreviate branch is tried first, so the results come out in the
	// canonical order the statement pins.
	results := make([]string, 0, 1<<len(word))
	var walk func(pos int, prefix string, count int)
	walk = func(pos int, prefix string, count int) {
		if pos == len(word) {
			if count > 0 {
				results = append(results, prefix+strconv.Itoa(count))
			} else {
				results = append(results, prefix)
			}
			return
		}
		// Abbreviate: extend the running count.
		walk(pos+1, prefix, count+1)
		// Keep: flush the pending count, then the letter.
		kept := prefix
		if count > 0 {
			kept += strconv.Itoa(count)
		}
		walk(pos+1, kept+string(word[pos]), 0)
	}
	walk(0, "", 0)
	return results
}
