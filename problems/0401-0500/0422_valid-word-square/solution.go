// A word square mirrors across its diagonal with absence counted: the
// character at (i, j) demands a same-character mirror at (j, i), so row j
// must exist at all and reach back to column i.
func validWordSquare(words []string) bool {
	count := len(words)
	for i, row := range words {
		for j := 0; j < len(row); j++ {
			if j >= count || i >= len(words[j]) || words[j][i] != row[j] {
				return false
			}
		}
	}
	return true
}
