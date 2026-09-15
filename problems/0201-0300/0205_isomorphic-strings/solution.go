// The contract is symmetric and names its own data structure: every character
// of s keeps one consistent replacement (forward), and no two characters share
// a replacement (reverse). Each clause is one map, enforced together in a
// single order-preserving pass.
func isIsomorphic(s string, t string) bool {
	if len(s) != len(t) {
		// Strings of different lengths can never be aligned position for position.
		return false
	}
	forward := make(map[byte]byte)
	reverse := make(map[byte]byte)
	for index := 0; index < len(s); index++ {
		// One branch per contract clause: a source already bound to a
		// different replacement, or a target already claimed by another source.
		if bound, ok := forward[s[index]]; ok && bound != t[index] {
			return false
		}
		if owner, ok := reverse[t[index]]; ok && owner != s[index] {
			return false
		}
		forward[s[index]] = t[index]
		reverse[t[index]] = s[index]
	}
	return true
}
