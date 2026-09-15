func isValid(s string) bool {
	// Map each closer to its required opener, so the expected partner of any
	// closing bracket is a single lookup.
	pairs := map[byte]byte{')': '(', ']': '[', '}': '{'}
	var stack []byte
	for i := 0; i < len(s); i++ {
		ch := s[i]
		// Openers are pushed: the most recently opened bracket is always the
		// one that must close next -- a LIFO discipline the stack models
		// directly.
		if ch == '(' || ch == '[' || ch == '{' {
			stack = append(stack, ch)
		} else {
			// An empty stack means nothing is open, so the closer is
			// unmatched; otherwise the top must equal the required opener.
			if len(stack) == 0 || stack[len(stack)-1] != pairs[ch] {
				return false
			}
			stack = stack[:len(stack)-1]
		}
	}
	// Valid exactly when nothing is left open; catches inputs like "(((".
	return len(stack) == 0
}
