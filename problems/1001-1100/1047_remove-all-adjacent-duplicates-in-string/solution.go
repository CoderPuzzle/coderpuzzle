func removeDuplicates(s string) string {
	stack := make([]byte, 0, len(s))
	for i := 0; i < len(s); i++ {
		ch := s[i]
		if n := len(stack); n > 0 && stack[n-1] == ch {
			stack = stack[:n-1]
		} else {
			stack = append(stack, ch)
		}
	}
	return string(stack)
}
