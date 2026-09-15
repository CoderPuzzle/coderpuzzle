import "sort"

func numSpecialEquivGroups(words []string) int {
	// Swaps never mix parities: even-indexed letters only trade with
	// even-indexed ones, odd with odd, so a word is exactly its two
	// sorted halves. The set counts distinct (even, odd) signatures.
	seen := make(map[string]bool)
	for _, word := range words {
		var even, odd []byte
		for i := 0; i < len(word); i++ {
			if i%2 == 0 {
				even = append(even, word[i])
			} else {
				odd = append(odd, word[i])
			}
		}
		sort.Slice(even, func(a, b int) bool { return even[a] < even[b] })
		sort.Slice(odd, func(a, b int) bool { return odd[a] < odd[b] })
		seen[string(even)+"#"+string(odd)] = true
	}
	return len(seen)
}
