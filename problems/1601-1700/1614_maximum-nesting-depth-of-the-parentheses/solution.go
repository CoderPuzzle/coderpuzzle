func maxDepth(s string) int {
	// s is guaranteed to be a VPS, so a running depth counter suffices:
	// '(' increments it, ')' decrements it, everything else is skipped.
	depth := 0
	best := 0
	for _, ch := range s {
		if ch == '(' {
			depth++
			if depth > best {
				best = depth
			}
		} else if ch == ')' {
			depth--
		}
	}
	return best
}
