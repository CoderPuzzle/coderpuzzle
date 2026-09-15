func minChanges(s string) int {
	// Every beautiful partition refines into length-2 uniform blocks:
	// split each even uniform part down to pairs. So the answer is the
	// number of aligned pairs that are not already uniform, and each
	// such pair costs exactly one change (align both to one value).
	changes := 0
	for i := 0; i+1 < len(s); i += 2 {
		if s[i] != s[i+1] {
			changes++
		}
	}
	return changes
}
