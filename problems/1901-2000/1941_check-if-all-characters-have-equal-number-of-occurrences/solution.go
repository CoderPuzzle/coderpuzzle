// Every present character must share one frequency, so the set of the
// per-character counts has size one.
func areOccurrencesEqual(s string) bool {
	counts := make([]int, 26)
	for i := 0; i < len(s); i++ {
		counts[s[i]-'a']++
	}
	seen := map[int]struct{}{}
	for _, c := range counts {
		if c > 0 {
			seen[c] = struct{}{}
		}
	}
	return len(seen) == 1
}
