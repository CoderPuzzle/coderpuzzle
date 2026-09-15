func generateParenthesis(n int) []string {
	var result []string
	var current []byte
	var backtrack func(openCount, closeCount int)
	backtrack = func(openCount, closeCount int) {
		// Under the two guards below every leaf reached at length 2n is
		// well-formed by construction, so nothing needs re-validating.
		if len(current) == 2*n {
			result = append(result, string(current))
			return
		}
		// Try '(' first ('(' < ')') so leaves emerge in lexicographic order;
		// it is allowed while fewer than n openings are placed.
		if openCount < n {
			// Append, recurse, truncate: one shared buffer is the working
			// storage for the whole tree.
			current = append(current, '(')
			backtrack(openCount+1, closeCount)
			current = current[:len(current)-1]
		}
		// ')' only while closings still trail openings -- appending it can
		// never make the prefix invalid.
		if closeCount < openCount {
			current = append(current, ')')
			backtrack(openCount, closeCount+1)
			current = current[:len(current)-1]
		}
	}
	backtrack(0, 0)
	return result
}
