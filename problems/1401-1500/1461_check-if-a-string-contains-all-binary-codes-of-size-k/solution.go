func hasAllCodes(s string, k int) bool {
	// all 2^k codes present <=> distinct length-k substrings reach 2^k;
	// a string shorter than k cannot host even one code of length k
	need := 1 << k
	if len(s) < k {
		return false
	}
	seen := make(map[string]bool)
	for i := 0; i+k <= len(s); i++ {
		seen[s[i:i+k]] = true
		// early exit: codes exhausted before the string ends
		if len(seen) == need {
			return true
		}
	}
	return len(seen) == need
}
