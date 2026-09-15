import "sort"

// A word qualifies iff every proper prefix chain is present. Sort once; the
// first qualifying word of each new record length wins, and lexicographic
// order breaks length ties for free.
func longestWord(words []string) string {
	set := make(map[string]bool, len(words))
	uniq := make([]string, 0, len(words))
	for _, w := range words {
		if !set[w] {
			set[w] = true
			uniq = append(uniq, w)
		}
	}
	sort.Strings(uniq)
	best := ""
	for _, w := range uniq {
		if len(w) <= len(best) {
			continue
		}
		ok := true
		for i := 1; i < len(w); i++ {
			if !set[w[:i]] {
				ok = false
				break
			}
		}
		if ok {
			best = w
		}
	}
	return best
}
