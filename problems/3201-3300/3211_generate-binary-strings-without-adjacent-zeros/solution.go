func validStrings(n int) []string {
	// A valid string never contains "00", so the choice at each position
	// depends only on the previous character: after a 0 the next char is
	// forced to be 1, after a 1 either character may follow. Appending 0
	// right after a 0 is the only move that can ever go wrong, so pruning
	// exactly that branch keeps every surviving path valid. Trying 0
	// before 1 makes the depth-first walk emit the strings already in
	// ascending lexicographic order — no final sort needed.
	var current []byte
	var results []string
	var backtrack func()
	backtrack = func() {
		if len(current) == n {
			results = append(results, string(current))
			return
		}
		for _, ch := range []byte{'0', '1'} {
			if ch == '0' && len(current) > 0 && current[len(current)-1] == '0' {
				continue // would create "00" — prune this branch
			}
			current = append(current, ch)
			backtrack()
			current = current[:len(current)-1]
		}
	}
	backtrack()
	return results
}
