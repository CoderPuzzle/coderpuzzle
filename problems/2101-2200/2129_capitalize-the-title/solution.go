import "strings"

func capitalizeTitle(title string) string {
	words := strings.Split(title, " ")
	for index, word := range words {
		lowered := strings.ToLower(word)
		if len(lowered) > 2 {
			lowered = strings.ToUpper(lowered[:1]) + lowered[1:]
		}
		words[index] = lowered
	}
	return strings.Join(words, " ")
}
