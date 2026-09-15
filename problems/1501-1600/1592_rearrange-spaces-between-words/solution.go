import "strings"

// Distribute spaces as evenly as possible between the words, pushing
// whatever does not divide evenly to the end of the string.
func reorderSpaces(text string) string {
	words := strings.Fields(text)
	spaces := strings.Count(text, " ")

	if len(words) == 1 {
		// A single word: every space is trailing.
		return words[0] + strings.Repeat(" ", spaces)
	}

	gaps := len(words) - 1
	between := spaces / gaps
	extra := spaces % gaps

	return strings.Join(words, strings.Repeat(" ", between)) + strings.Repeat(" ", extra)
}
