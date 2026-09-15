import "strings"

// Greedy packing: the current line keeps accepting words while its letters
// plus one joining space per gap still fit in maxWidth; the first word that
// would overflow opens a new line.
func fullJustify(words []string, maxWidth int) []string {
	lines := [][]string{}
	current := []string{}
	letters := 0
	for _, word := range words {
		if len(current) > 0 && letters+len(word)+len(current) > maxWidth {
			lines = append(lines, current)
			current = []string{}
			letters = 0
		}
		current = append(current, word)
		letters += len(word)
	}
	lines = append(lines, current)

	justified := make([]string, 0, len(lines))
	for index, line := range lines {
		justified = append(justified, render(line, index == len(lines)-1, maxWidth))
	}
	return justified
}

// The last line, and any line holding a single word, is left-justified:
// single spaces between words, padding all on the tail.
func render(line []string, isLast bool, maxWidth int) string {
	if isLast || len(line) == 1 {
		text := strings.Join(line, " ")
		return text + strings.Repeat(" ", maxWidth-len(text))
	}
	letters := 0
	for _, word := range line {
		letters += len(word)
	}
	gaps := len(line) - 1
	base, extra := (maxWidth-letters)/gaps, (maxWidth-letters)%gaps
	var text strings.Builder
	for gap := 0; gap < gaps; gap++ {
		text.WriteString(line[gap])
		// Every gap gets `base` spaces and the leftmost `extra` gaps one
		// more, so left slots are never narrower than right ones.
		spaces := base
		if gap < extra {
			spaces++
		}
		text.WriteString(strings.Repeat(" ", spaces))
	}
	text.WriteString(line[gaps])
	return text.String()
}
