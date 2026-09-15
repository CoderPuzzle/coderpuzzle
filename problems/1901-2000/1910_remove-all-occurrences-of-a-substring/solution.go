// Stream s through a survivor stack. A removal can only expose
// characters at the top, so after each push the last len(part) chars are
// checked and popped when they spell out part — the freshly exposed top
// then gets its own chance on a later push.
func removeOccurrences(s string, part string) string {
	m := len(part)
	stack := []byte{}
	for i := 0; i < len(s); i++ {
		stack = append(stack, s[i])
		if len(stack) >= m && string(stack[len(stack)-m:]) == part {
			stack = stack[:len(stack)-m]
		}
	}
	return string(stack)
}
