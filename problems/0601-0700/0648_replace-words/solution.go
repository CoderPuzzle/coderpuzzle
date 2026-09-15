import (
	"strings"
)

func replaceWords(dictionary []string, sentence string) string {
	// One set holds every root, so a prefix test is a single hash
	// lookup. No root is longer than 100 letters, so a word longer
	// than that can stop its scan early — prefixes past the cap could
	// not equal any root anyway.
	roots := make(map[string]bool)
	for _, root := range dictionary {
		roots[root] = true
	}
	// Each derivative is replaced by its shortest matching root, and
	// the scan tries prefixes shortest first, so the first hit is the
	// answer; a word no root prefixes keeps itself.
	replaced := make([]string, 0)
	for _, word := range strings.Split(sentence, " ") {
		replacement := word
		limit := len(word)
		if limit > 100 {
			limit = 100
		}
		for length := 1; length <= limit; length++ {
			prefix := word[:length]
			if roots[prefix] {
				replacement = prefix
				break
			}
		}
		replaced = append(replaced, replacement)
	}
	return strings.Join(replaced, " ")
}
