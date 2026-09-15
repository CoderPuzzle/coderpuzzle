// The stack holds the settled prefix: survivors with no close pair among
// them. A merge always deletes the right member, so the incoming char — the
// rightmost — either finds an equal survivor within distance k (its position
// is len(stack), so the window is the last k survivors) and vanishes, or it
// settles on top. One sweep replays the rule.
func mergeCharacters(s string, k int) string {
	stack := make([]byte, 0, len(s))
	for i := 0; i < len(s); i++ {
		c := s[i]
		lo := len(stack) - k
		if lo < 0 {
			lo = 0
		}
		absorbed := false
		for j := lo; j < len(stack); j++ {
			if stack[j] == c {
				absorbed = true
				break
			}
		}
		if !absorbed {
			stack = append(stack, c)
		}
	}
	return string(stack)
}
