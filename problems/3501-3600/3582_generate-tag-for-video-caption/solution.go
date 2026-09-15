import "strings"

func generateTag(caption string) string {
	// Words are joined in order — the first word fully lowercase, later
	// words with only their first letter capitalized — then the leading
	// '#' plus English letters survive and the tag is cut to 100
	// characters.
	words := strings.Fields(caption)
	var tag strings.Builder
	tag.WriteByte('#')
	for index, word := range words {
		lower := strings.ToLower(word)
		if index > 0 {
			lower = strings.ToUpper(lower[:1]) + lower[1:]
		}
		tag.WriteString(lower)
	}
	kept := make([]byte, 1, 101)
	kept[0] = '#'
	text := tag.String()
	for i := 1; i < len(text); i++ {
		ch := text[i]
		if (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') {
			kept = append(kept, ch)
		}
	}
	if len(kept) > 100 {
		kept = kept[:100]
	}
	return string(kept)
}
