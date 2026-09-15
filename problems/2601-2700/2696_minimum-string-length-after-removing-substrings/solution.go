func minLength(s string) int {
	stack := make([]rune, 0, len(s))
	for _, ch := range s {
		n := len(stack)
		if n > 0 && ((stack[n-1] == 'A' && ch == 'B') || (stack[n-1] == 'C' && ch == 'D')) {
			stack = stack[:n-1]
		} else {
			stack = append(stack, ch)
		}
	}
	return len(stack)
}
