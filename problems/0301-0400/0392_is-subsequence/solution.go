// Walk t once, advancing a pointer into s on every match; greedy is safe —
// matching each character at its earliest legal position in t never hurts
// a later one.
func isSubsequence(s string, t string) bool {
	i := 0
	for j := 0; j < len(t) && i < len(s); j++ {
		if t[j] == s[i] {
			i++
		}
	}
	// All of s was matched in order iff the pointer reached its end.
	return i == len(s)
}
