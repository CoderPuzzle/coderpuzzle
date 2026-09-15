import "sort"

// The answer depends only on how often each character occurs, and the
// alphabet is fixed — one slot per possible character, one pass.
func frequencySort(s string) string {
	counts := make([]int, 128)
	for i := 0; i < len(s); i++ {
		counts[s[i]]++
	}
	ranked := make([]int, 128)
	for c := range ranked {
		ranked[c] = c
	}
	// Frequency descending, ties broken by character ascending — the
	// pinned order that makes the expected output unique.
	sort.Slice(ranked, func(a, b int) bool {
		if counts[ranked[a]] != counts[ranked[b]] {
			return counts[ranked[a]] > counts[ranked[b]]
		}
		return ranked[a] < ranked[b]
	})
	out := make([]byte, 0, len(s))
	for _, c := range ranked {
		for i := 0; i < counts[c]; i++ {
			out = append(out, byte(c))
		}
	}
	return string(out)
}
