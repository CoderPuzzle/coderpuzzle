func resultingString(s string) string {
	// Left-to-right stack: a fresh character cancels the top when the two
	// are circular-adjacent; the pair exposed by a pop is exactly the next
	// pair the leftmost-first rule would remove.
	stack := make([]byte, 0, len(s))
	for index := 0; index < len(s); index++ {
		ch := s[index]
		if len(stack) > 0 {
			diff := int(stack[len(stack)-1]-ch+26) % 26
			if diff == 1 || diff == 25 {
				stack = stack[:len(stack)-1]
				continue
			}
		}
		stack = append(stack, ch)
	}
	return string(stack)
}
