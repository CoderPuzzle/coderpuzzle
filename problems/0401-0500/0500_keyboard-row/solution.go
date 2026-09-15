// One map from each letter to its keyboard row 0, 1 or 2, built once from the
// three row listings: both cases of a letter land in the same bucket, which is
// the whole case-insensitivity story. A word survives iff no letter ever
// leaves the row its first letter fixed, and it is kept in its own casing.
func findWords(words []string) []string {
	rowOf := make(map[byte]int, 52)
	for row, letters := range []string{"qwertyuiop", "asdfghjkl", "zxcvbnm"} {
		for i := 0; i < len(letters); i++ {
			ch := letters[i]
			rowOf[ch] = row
			rowOf[ch-'a'+'A'] = row
		}
	}
	result := make([]string, 0, len(words))
	for _, word := range words {
		firstRow := rowOf[word[0]]
		oneRow := true
		for i := 0; i < len(word); i++ {
			if rowOf[word[i]] != firstRow {
				oneRow = false
				break
			}
		}
		if oneRow {
			result = append(result, word)
		}
	}
	return result
}
