func countPairs(words []string) int64 {
	// Shifting a word by k adds k to every letter, so two words are
	// similar exactly when subtracting each word's own first letter
	// maps both onto the same normalized key: (c - word[0]) mod 26.
	counts := make(map[string]int64)
	for _, word := range words {
		base := int(word[0] - 'a')
		key := make([]byte, len(word))
		for i := 0; i < len(word); i++ {
			key[i] = byte('a' + (int(word[i])-'a'-base+26)%26)
		}
		counts[string(key)]++
	}
	// Pairs live inside one class; n <= 10^5 bounds the total by
	// n(n-1)/2 < 5 * 10^9, which fits int64 exactly.
	pairs := int64(0)
	for _, c := range counts {
		pairs += c * (c - 1) / 2
	}
	return pairs
}
