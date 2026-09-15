func checkZeroOnes(s string) bool {
	// One pass tracks the current run; each character's best run is
	// folded in on change and once more after the loop. A digit that
	// never appears keeps its best at 0, per the statement's rule.
	best := [2]int{}
	prev := byte(' ')
	cur := 0
	for i := 0; i <= len(s); i++ {
		ch := byte(' ')
		if i < len(s) {
			ch = s[i]
		}
		if ch == prev {
			cur++
		} else {
			if prev == '0' || prev == '1' {
				if cur > best[prev-'0'] {
					best[prev-'0'] = cur
				}
			}
			cur = 1
			prev = ch
		}
	}
	return best[1] > best[0]
}
