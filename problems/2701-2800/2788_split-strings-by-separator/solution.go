import "strings"

func splitWordsBySeparator(words []string, separator string) []string {
	// Split each word at every occurrence of separator and keep the non-empty
	// pieces: leading/trailing separators give empty edge pieces and adjacent
	// ones empty middle pieces; the statement excludes empties, so appending
	// the survivors in walk order yields exactly the required strings.
	result := []string{}
	for _, word := range words {
		for _, piece := range strings.Split(word, separator) {
			if piece != "" {
				result = append(result, piece)
			}
		}
	}
	return result
}
