func mapWordWeights(words []string, weights []int) string {
	// Each word's weight is the sum of its characters' entries in
	// weights — at most 10 chars * 100 = 1000, comfortably inside an
	// int. Reflecting that total's residue mod 26 down from 'z' gives
	// one letter per word (0 -> 'z', 1 -> 'y', ..., 25 -> 'a').
	letters := make([]byte, 0, len(words))
	for _, word := range words {
		total := 0
		for i := 0; i < len(word); i++ {
			total += weights[word[i]-'a']
		}
		letters = append(letters, byte('z'-total%26))
	}
	return string(letters)
}
