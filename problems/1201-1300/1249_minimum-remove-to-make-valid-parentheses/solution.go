func minRemoveToMakeValid(s string) string {
	keep := make([]bool, len(s))
	for i := range keep {
		keep[i] = true
	}
	opens := []int{} // indices of '(' still hoping for a partner
	for i := 0; i < len(s); i++ {
		switch s[i] {
		case '(':
			opens = append(opens, i)
		case ')':
			if len(opens) > 0 {
				opens = opens[:len(opens)-1] // matched: both survive
			} else {
				keep[i] = false // orphan close, doomed
			}
		}
	}
	for _, i := range opens {
		keep[i] = false // opens that never found a close
	}
	out := make([]byte, 0, len(s))
	for i := 0; i < len(s); i++ {
		if keep[i] {
			out = append(out, s[i])
		}
	}
	return string(out)
}
