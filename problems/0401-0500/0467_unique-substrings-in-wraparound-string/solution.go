// A substring of base is exactly a run of consecutive alphabet letters, and
// a run is pinned by its last letter plus its length — the characters before
// any ending position are forced. So best[c] only needs to track the longest
// run ending at letter c.
func findSubstringInWraproundString(s string) int {
	var best [26]int
	run := 0
	for i := 0; i < len(s); i++ {
		// The run continues when s[i] is the alphabet successor of the
		// previous letter, wrapping z -> a; otherwise it restarts at 1.
		if i > 0 && (s[i-1]-'a'+1)%26 == s[i]-'a' {
			run++
		} else {
			run = 1
		}
		j := s[i] - 'a'
		if run > best[j] {
			best[j] = run
		}
	}
	// A run of length L ending at c contributes exactly its L suffixes, all
	// runs, all distinct; the max per letter keeps each once.
	total := 0
	for _, value := range best {
		total += value
	}
	return total
}
