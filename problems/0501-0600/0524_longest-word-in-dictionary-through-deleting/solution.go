// Deleting characters from s leaves a subsequence, so a word is formable
// exactly when it is one. Walk s once, matching each word character at its
// earliest legal position — greedy is safe, and the word forms iff the
// pointer runs off its end.
func findLongestWord(s string, dictionary []string) string {
	best := ""
	for _, word := range dictionary {
		i := 0
		for j := 0; j < len(s) && i < len(word); j++ {
			if s[j] == word[i] {
				i++
			}
		}
		formable := i == len(word)
		// Longer wins; equal lengths go to the lexicographically smaller
		// word. The empty seed makes the no-answer case return "".
		if formable && (len(word) > len(best) || (len(word) == len(best) && word < best)) {
			best = word
		}
	}
	return best
}
