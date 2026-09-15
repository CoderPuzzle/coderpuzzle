// Typing is a story told right-to-left: each '#' deletes the nearest
// character to its left that survives, and backspacing an empty text leaves
// it empty. Walk both strings from the end, skip everything that gets
// deleted, and compare the survivors pairwise.
func backspaceCompare(s string, t string) bool {
	i, j := len(s)-1, len(t)-1
	for {
		i = settle(s, i)
		j = settle(t, j)
		if i < 0 || j < 0 {
			// One text ran out: equal only if both did, so both-empty
			// counts as equal and a lone survivor decides false.
			return i == j
		}
		if s[i] != t[j] {
			return false
		}
		i--
		j--
	}
}

// settle moves index left past deleted characters and returns the nearest
// survivor's index, or -1 when nothing survives.
func settle(text string, index int) int {
	skip := 0
	for index >= 0 {
		switch {
		case text[index] == '#':
			skip++
		case skip > 0:
			skip--
		default:
			return index
		}
		index--
	}
	return -1
}
