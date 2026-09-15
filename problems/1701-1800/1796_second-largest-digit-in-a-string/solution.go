// One pass tracking the two largest distinct digits seen: first is
// the maximum, second the runner-up. A digit equal to an
// already-tracked value changes nothing, which is the distinctness
// rule; -1 survives when fewer than two distinct digits appear.
func secondHighest(s string) int {
	first := -1
	second := -1
	for i := 0; i < len(s); i++ {
		c := s[i]
		if c >= '0' && c <= '9' {
			v := int(c - '0')
			if v > first {
				second = first
				first = v
			} else if second < v && v < first {
				second = v
			}
		}
	}
	return second
}
