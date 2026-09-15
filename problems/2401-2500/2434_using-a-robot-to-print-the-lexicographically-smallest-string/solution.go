func robotWithString(s string) string {
	n := len(s)
	// t behaves as a stack: characters enter in s's order and leave from
	// the end, so the paper receives some pop sequence.
	// suffixMin[i] = smallest char still to arrive from s[i:]; the
	// sentinel at n exceeds every letter and also serves the drain.
	suffixMin := make([]byte, n+1)
	suffixMin[n] = 127
	for i := n - 1; i >= 0; i-- {
		c := s[i]
		if suffixMin[i+1] < c {
			c = suffixMin[i+1]
		}
		suffixMin[i] = c
	}
	var stack []byte
	out := make([]byte, 0, n)
	for i := 0; i < n; i++ {
		// Pop the top while nothing smaller remains unread: writing it
		// now is never wrong, since later arrivals are >= top. Ties pop
		// early too — safe and never a wasted hold.
		for len(stack) > 0 && stack[len(stack)-1] <= suffixMin[i] {
			out = append(out, stack[len(stack)-1])
			stack = stack[:len(stack)-1]
		}
		stack = append(stack, s[i])
	}
	// Input exhausted: flush the rest (the sentinel makes this the same
	// condition as the main loop).
	for len(stack) > 0 {
		out = append(out, stack[len(stack)-1])
		stack = stack[:len(stack)-1]
	}
	return string(out)
}
