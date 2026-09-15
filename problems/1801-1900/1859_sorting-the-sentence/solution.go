import "strings"

// The trailing digit is the 1-indexed slot; drop each word into its slot and
// rejoin.
func sortSentence(s string) string {
	words := strings.Split(s, " ")
	out := make([]string, len(words))
	for _, w := range words {
		out[w[len(w)-1]-'1'] = w[:len(w)-1]
	}
	return strings.Join(out, " ")
}
