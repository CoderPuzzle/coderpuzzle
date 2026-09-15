import "sort"

func wordSquares(words []string) [][]string {
	n := len(words[0])
	// Map every prefix of every word (empty prefix included) to the words
	// sharing it, so each search step is a single lookup.
	prefixMap := make(map[string][]string)
	for _, w := range words {
		for i := 0; i <= n; i++ {
			p := w[:i]
			prefixMap[p] = append(prefixMap[p], w)
		}
	}

	results := make([][]string, 0)
	square := make([]string, 0, n)

	var backtrack func()
	backtrack = func() {
		if len(square) == n {
			results = append(results, append([]string{}, square...))
			return
		}
		col := len(square)
		// Row `col` must start with the column-`col` chars already placed,
		// so the next word is constrained to one forced prefix.
		prefix := ""
		for r := 0; r < col; r++ {
			prefix += string(square[r][col])
		}
		// A matching word fixes square[j][col] == square[col][j] for every
		// earlier row j at once; a missing bucket prunes the branch here.
		for _, w := range prefixMap[prefix] {
			square = append(square, w)
			backtrack()
			square = square[:len(square)-1]
		}
	}
	backtrack()

	// Sorting only makes the output order deterministic.
	sort.Slice(results, func(a, b int) bool {
		for i := 0; i < n; i++ {
			if results[a][i] != results[b][i] {
				return results[a][i] < results[b][i]
			}
		}
		return false
	})
	return results
}
