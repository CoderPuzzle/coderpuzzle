import (
	"strings"
)

// The shorter word list must be covered by a common prefix plus a common
// suffix of the longer one; whatever sits between them is the inserted
// sentence.
func areSentencesSimilar(sentence1 string, sentence2 string) bool {
	w1 := strings.Split(sentence1, " ")
	w2 := strings.Split(sentence2, " ")
	i := 0
	for i < len(w1) && i < len(w2) && w1[i] == w2[i] {
		i++
	}
	j := 0
	for j < len(w1)-i && j < len(w2)-i && w1[len(w1)-1-j] == w2[len(w2)-1-j] {
		j++
	}
	return i+j >= min(len(w1), len(w2))
}
