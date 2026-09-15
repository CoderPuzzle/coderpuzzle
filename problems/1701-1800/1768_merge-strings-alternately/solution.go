import (
	"strings"
)

// One pointer per word: emit alternately while both words still have
// characters, then append whichever tail remains.
func mergeAlternately(word1 string, word2 string) string {
	var out strings.Builder
	out.Grow(len(word1) + len(word2))
	i, j := 0, 0
	for i < len(word1) && j < len(word2) {
		out.WriteByte(word1[i])
		out.WriteByte(word2[j])
		i++
		j++
	}
	out.WriteString(word1[i:])
	out.WriteString(word2[j:])
	return out.String()
}
