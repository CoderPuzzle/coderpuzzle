func isOneEditDistance(s string, t string) bool {
	// Swap so s is the shorter (or equal) string: a delete on one side
	// is an insert on the other, so one orientation covers both.
	if len(s) > len(t) {
		s, t = t, s
	}
	// No single edit changes the length by more than one.
	if len(t)-len(s) > 1 {
		return false
	}
	for i := 0; i < len(s); i++ {
		if s[i] != t[i] {
			if len(s) == len(t) {
				// Replace: both tails after the first divergence must agree.
				return s[i+1:] == t[i+1:]
			}
			// Insert t[i] into s: s from here must match t from the next slot.
			return s[i:] == t[i+1:]
		}
	}
	// s is a prefix of t: identical strings are zero edits apart, so exactly
	// one edit remains only if t has one character more.
	return len(t)-len(s) == 1
}
