func longestContinuousSubstring(s string) int {
	best := 1
	run := 1
	for i := 1; i < len(s); i++ {
		if s[i] == s[i-1]+1 {
			run++
		} else {
			run = 1
		}
		if run > best {
			best = run
		}
	}
	return best
}
