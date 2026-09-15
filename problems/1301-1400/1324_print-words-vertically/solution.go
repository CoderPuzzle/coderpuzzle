import "strings"

func printVertically(s string) []string {
	// Row k takes character k of every word in order; short words pad with a
	// space, and trailing spaces are trimmed off each row.
	words := strings.Split(s, " ")
	height := 0
	for _, word := range words {
		if len(word) > height {
			height = len(word)
		}
	}
	rows := make([]string, 0, height)
	for k := 0; k < height; k++ {
		row := make([]byte, len(words))
		last := 0
		for w, word := range words {
			if k < len(word) {
				row[w] = word[k]
				last = w + 1
			} else {
				row[w] = ' '
			}
		}
		rows = append(rows, string(row[:last]))
	}
	return rows
}
