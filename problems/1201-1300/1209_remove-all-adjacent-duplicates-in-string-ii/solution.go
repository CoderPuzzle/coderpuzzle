func removeDuplicates(s string, k int) string {
	type pair struct {
		ch byte
		n  int
	}
	stack := make([]pair, 0, len(s))
	for i := 0; i < len(s); i++ {
		ch := s[i]
		if n := len(stack); n > 0 && stack[n-1].ch == ch {
			stack[n-1].n++
			if stack[n-1].n == k {
				stack = stack[:n-1]
			}
		} else {
			stack = append(stack, pair{ch, 1})
		}
	}
	out := make([]byte, 0, len(s))
	for _, p := range stack {
		for i := 0; i < p.n; i++ {
			out = append(out, p.ch)
		}
	}
	return string(out)
}
