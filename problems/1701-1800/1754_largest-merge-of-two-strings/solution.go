// Take the next character from whichever REMAINING string is
// lexicographically larger — the suffix comparison settles not just
// differing heads but the tie case.
func largestMerge(word1 string, word2 string) string {
	out := make([]byte, 0, len(word1)+len(word2))
	i, j := 0, 0
	for i < len(word1) && j < len(word2) {
		if word1[i:] > word2[j:] {
			out = append(out, word1[i])
			i++
		} else {
			out = append(out, word2[j])
			j++
		}
	}
	out = append(out, word1[i:]...)
	out = append(out, word2[j:]...)
	return string(out)
}
