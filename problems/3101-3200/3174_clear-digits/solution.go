// Survivors so far form a stack; a digit always removes the closest
// non-digit still standing to its left, which is exactly its top.
func clearDigits(s string) string {
	kept := make([]byte, 0, len(s))
	for i := 0; i < len(s); i++ {
		if s[i] >= '0' && s[i] <= '9' {
			kept = kept[:len(kept)-1]
		} else {
			kept = append(kept, s[i])
		}
	}
	return string(kept)
}
