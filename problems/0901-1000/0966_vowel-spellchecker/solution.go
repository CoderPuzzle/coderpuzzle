import "strings"

// devowel blanks out the vowels of an already-lowercase word.
func devowel(low string) string {
	return strings.Map(func(r rune) rune {
		switch r {
		case 'a', 'e', 'i', 'o', 'u':
			return '*'
		}
		return r
	}, low)
}

func spellchecker(wordlist []string, queries []string) []string {
	// One pass over the wordlist builds all three lookups; the "ok" idiom
	// keeps the FIRST word claiming each key — first-match-wins.
	exact := make(map[string]struct{})
	byLower := make(map[string]string)
	byDevowel := make(map[string]string)
	for _, w := range wordlist {
		exact[w] = struct{}{}
		low := strings.ToLower(w)
		if _, ok := byLower[low]; !ok {
			byLower[low] = w
		}
		dv := devowel(low)
		if _, ok := byDevowel[dv]; !ok {
			byDevowel[dv] = w
		}
	}
	// Each query walks the tiers in precedence order: exact echo, then
	// case-insensitive, then vowel-blind, then "".
	answer := make([]string, 0, len(queries))
	for _, q := range queries {
		if _, ok := exact[q]; ok {
			answer = append(answer, q)
			continue
		}
		low := strings.ToLower(q)
		if hit, ok := byLower[low]; ok {
			answer = append(answer, hit)
			continue
		}
		if hit, ok := byDevowel[devowel(low)]; ok {
			answer = append(answer, hit)
			continue
		}
		answer = append(answer, "")
	}
	return answer
}
