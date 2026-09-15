func reverseParentheses(s string) string {
	// fragment stack mirrors the parenthesis nesting; the base fragment is
	// the outermost level and ends up holding the answer
	stack := [][]byte{{}}
	for i := 0; i < len(s); i++ {
		ch := s[i]
		switch ch {
		case '(':
			// open a fresh fragment for the new nesting level
			stack = append(stack, []byte{})
		case ')':
			// matching pair complete: reverse the finished fragment and fold
			// it into the level below — reversal composes with nesting
			top := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			for l, r := 0, len(top)-1; l < r; l, r = l+1, r-1 {
				top[l], top[r] = top[r], top[l]
			}
			stack[len(stack)-1] = append(stack[len(stack)-1], top...)
		default:
			// letters accumulate in the innermost current fragment
			stack[len(stack)-1] = append(stack[len(stack)-1], ch)
		}
	}
	return string(stack[0])
}
