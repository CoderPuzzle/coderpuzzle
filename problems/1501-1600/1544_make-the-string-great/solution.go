// Walk the string once, keeping a stack of characters kept so far. A new
// character only ever conflicts with the character directly above it on
// the stack, because anything further down was already separated from it
// by characters that didn't cancel. So comparing against just the top is
// enough to reproduce the full repeated removal process in a single pass.
func makeGood(s string) string {
	stack := make([]byte, 0, len(s))
	for i := 0; i < len(s); i++ {
		ch := s[i]
		n := len(stack)
		if n > 0 && stack[n-1] != ch && toLower(stack[n-1]) == toLower(ch) {
			stack = stack[:n-1]
		} else {
			stack = append(stack, ch)
		}
	}
	return string(stack)
}

func toLower(b byte) byte {
	if b >= 'A' && b <= 'Z' {
		return b + ('a' - 'A')
	}
	return b
}
