// A length-2 substring of s shows up in reverse(s) exactly when its own
// reversal shows up somewhere in s, since reading s backwards turns every
// adjacent pair xy into yx. One pass records each pair in a set and looks
// the current pair up flipped — a hit on yx means an earlier xy mirrors
// into it, and a later yx finds the xy recorded before it. A doubled
// letter is its own reversal, so xx matches the moment it appears.
func isSubstringPresent(s string) bool {
	seen := make(map[[2]byte]bool)
	for i := 0; i+1 < len(s); i++ {
		if s[i] == s[i+1] || seen[[2]byte{s[i+1], s[i]}] {
			return true
		}
		seen[[2]byte{s[i], s[i+1]}] = true
	}
	return false
}
