import "strings"

func boldWords(words []string, s string) string {
	// Mark every position of s covered by any keyword occurrence.
	mask := make([]bool, len(s))
	for _, word := range words {
		// Restart one past each hit so self-overlapping occurrences
		// ("aa" inside "aaa") are all found.
		from := strings.Index(s, word)
		for from != -1 {
			for i := from; i < from+len(word); i++ {
				mask[i] = true
			}
			next := strings.Index(s[from+1:], word)
			if next == -1 {
				break
			}
			from = from + 1 + next
		}
	}
	// Wrap each maximal run of marked positions in exactly one pair.
	var out strings.Builder
	for i := 0; i < len(s); i++ {
		if mask[i] && (i == 0 || !mask[i-1]) {
			out.WriteString("<b>")
		} else if !mask[i] && i > 0 && mask[i-1] {
			out.WriteString("</b>")
		}
		out.WriteByte(s[i])
	}
	if len(s) > 0 && mask[len(s)-1] {
		out.WriteString("</b>")
	}
	return out.String()
}
