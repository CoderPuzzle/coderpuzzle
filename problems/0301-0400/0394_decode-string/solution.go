func decodeString(s string) string {
	type frame struct {
		prev  string
		times int
	}
	// One (previous_string, repeat_count) frame per unclosed '[' —
	// the stack mirrors the bracket structure, so context is never
	// lost no matter how deep the nesting goes.
	var stack []frame
	current := []byte{}
	repeat := 0
	for i := 0; i < len(s); i++ {
		ch := s[i]
		if ch >= '0' && ch <= '9' {
			// Multi-digit counts assemble digit by digit.
			repeat = repeat*10 + int(ch-'0')
		} else if ch == '[' {
			// Park the outer segment and its count; reset both for
			// the fresh inner segment.
			stack = append(stack, frame{string(current), repeat})
			current = current[:0]
			repeat = 0
		} else if ch == ']' {
			// Absorb the finished inner segment: restore the outer
			// string, then repeat-and-append onto it.
			f := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			merged := make([]byte, 0, len(f.prev)+len(current)*f.times)
			merged = append(merged, f.prev...)
			for t := 0; t < f.times; t++ {
				merged = append(merged, current...)
			}
			current = merged
		} else {
			current = append(current, ch)
		}
	}
	// Every bracket is closed, so the stack is empty and current is
	// the fully decoded string.
	return string(current)
}
