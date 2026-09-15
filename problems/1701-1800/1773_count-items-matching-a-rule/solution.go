// The three rule keys are exactly the three columns of every item, so the
// key resolves once to a column index and the loop below compares one fixed
// field of each row.
func countMatches(items [][]string, ruleKey string, ruleValue string) int {
	index := columnIndex(ruleKey)
	matches := 0
	for _, item := range items {
		if item[index] == ruleValue {
			matches++
		}
	}
	return matches
}

// "type" is column 0, "color" column 1, "name" column 2.
func columnIndex(ruleKey string) int {
	switch ruleKey {
	case "type":
		return 0
	case "color":
		return 1
	default:
		return 2
	}
}
