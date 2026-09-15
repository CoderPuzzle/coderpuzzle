// prev2 / prev1 count the decodings of the prefixes ending two and one
// position back; only those two feed the next position, so the full prefix
// table collapses into two rolling variables.
func numDecodings(s string) int {
	// Prefix counts can pass 2^31 even when the final answer fits.
	prev2, prev1 := 1, 0
	if s[0] != '0' {
		prev1 = 1
	}
	for i := 1; i < len(s); i++ {
		current := 0
		// One digit s[i]: a valid code on its own unless it is '0'.
		if s[i] != '0' {
			current += prev1
		}
		// Two digits s[i-1..i]: "1x" always, "2x" only up to "26".
		if s[i-1] == '1' || (s[i-1] == '2' && s[i] <= '6') {
			current += prev2
		}
		prev2, prev1 = prev1, current
	}
	return prev1
}
