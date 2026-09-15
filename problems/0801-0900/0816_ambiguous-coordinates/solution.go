func ambiguousCoordinates(s string) []string {
	// Non-nil empty so an answer-free result serializes as [].
	result := []string{}
	t := s[1 : len(s)-1]
	for i := 1; i < len(t); i++ {
		lefts := forms(t[:i])
		if len(lefts) == 0 {
			continue
		}
		rights := forms(t[i:])
		if len(rights) == 0 {
			continue
		}
		for _, a := range lefts {
			for _, b := range rights {
				result = append(result, "("+a+", "+b+")")
			}
		}
	}
	return result
}

// forms lists every valid rendering of the digit run t, in the statement's
// pinned order: decimal forms first, point moving right, then the plain
// integer last.
func forms(t string) []string {
	out := []string{}
	for k := 1; k < len(t); k++ {
		whole, frac := t[:k], t[k:]
		// The whole part may not open with '0' unless it is exactly "0",
		// and the fractional part may not end in '0'.
		if len(whole) > 1 && whole[0] == '0' {
			continue
		}
		if frac[len(frac)-1] == '0' {
			continue
		}
		out = append(out, whole+"."+frac)
	}
	if len(t) == 1 || t[0] != '0' {
		out = append(out, t)
	}
	return out
}
