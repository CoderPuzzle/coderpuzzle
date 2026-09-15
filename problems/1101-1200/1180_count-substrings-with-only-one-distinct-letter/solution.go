func countLetters(s string) int {
	total := 0
	run := 0
	var prev byte
	for i := 0; i < len(s); i++ {
		ch := s[i]
		// Extend the current uniform run, or start a new one; adding
		// the run length each step sums L(L+1)/2 per maximal run.
		if ch == prev {
			run++
		} else {
			run = 1
			prev = ch
		}
		total += run
	}
	return total
}
