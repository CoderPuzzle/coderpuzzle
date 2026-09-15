func longestCommonPrefix(strs []string) string {
	// The prefix cannot outlive the shortest string, so scanning column by
	// column stops exactly at the first position any string disagrees on or
	// ends.
	first := strs[0]
	for column := 0; column < len(first); column++ {
		// A shorter string ending here is as final as a mismatch: nothing
		// can extend the prefix past its last character.
		for _, s := range strs[1:] {
			if column == len(s) || s[column] != first[column] {
				return first[:column]
			}
		}
	}
	// Every column of the first string survived every other string.
	return first
}
