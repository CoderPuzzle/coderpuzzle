func longestValidParentheses(s string) int {
	// Stack of indices seeded with -1: a sentinel base marking the position
	// just before the current candidate stretch.
	stack := make([]int, 0, len(s)+1)
	stack = append(stack, -1)
	best := 0
	for i := 0; i < len(s); i++ {
		// Every '(' index is pushed, so the stack holds the still-unmatched
		// openers in order, with the base beneath them.
		if s[i] == '(' {
			stack = append(stack, i)
		} else {
			stack = stack[:len(stack)-1]
			if len(stack) == 0 {
				// The pop emptied the stack: this ')' is unmatched and can
				// never sit inside a valid substring, so its index becomes
				// the new base, fencing off everything to its left.
				stack = append(stack, i)
			} else {
				// The popped index was the '(' matching this ')'. The top now
				// names the closest barrier before the stretch ending here,
				// so i - top is its full length; barriers only disappear by
				// being matched, so "()()" measures 4, not 2.
				if i-stack[len(stack)-1] > best {
					best = i - stack[len(stack)-1]
				}
			}
		}
	}
	return best
}
