func removeDuplicateLetters(s string) string {
	// count[c] = occurrences of c strictly after the current position.
	var count [26]int
	for _, ch := range s {
		count[ch-'a']++
	}
	stack := []byte{}
	var inStack [26]bool
	for _, ch := range s {
		c := byte(ch - 'a')
		count[c]--
		// A letter already placed stays put: a second copy can never help.
		if inStack[c] {
			continue
		}
		// Local exchange: popping a larger top is safe exactly while it
		// still re-occurs later (count > 0), and only shrinks the prefix.
		for len(stack) > 0 {
			top := stack[len(stack)-1] - 'a'
			if top > c && count[top] > 0 {
				inStack[top] = false
				stack = stack[:len(stack)-1]
			} else {
				break
			}
		}
		stack = append(stack, byte('a'+c))
		inStack[c] = true
	}
	return string(stack)
}
