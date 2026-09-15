func minSteps(s string, t string) int {
	// The answer is the per-letter deficit of t relative to s; each
	// replacement clears one unit, and deficits equal surpluses.
	var counts [26]int
	for i := 0; i < len(s); i++ {
		counts[s[i]-'a']++
	}
	for i := 0; i < len(t); i++ {
		counts[t[i]-'a']--
	}
	steps := 0
	for _, delta := range counts {
		if delta < 0 {
			steps -= delta
		}
	}
	return steps
}
