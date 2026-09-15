// The size bound invites brute force: tally every special
// substring in a hash map, then keep the longest that reached
// three occurrences.
func maximumLength(s string) int {
	counts := make(map[string]int)
	n := len(s)
	for i := 0; i < n; i++ {
		for j := i; j < n; j++ {
			if s[j] != s[i] {
				break
			}
			counts[s[i:j+1]]++
		}
	}
	best := -1
	for sub, c := range counts {
		if c >= 3 && len(sub) > best {
			best = len(sub)
		}
	}
	return best
}
