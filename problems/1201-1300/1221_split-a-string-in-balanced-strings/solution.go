func balancedStringSplit(s string) int {
	// +1 for L, -1 for R: every return to zero is one more balanced piece,
	// and cutting at each is the finest valid split.
	balance, pieces := 0, 0
	for i := 0; i < len(s); i++ {
		if s[i] == 'L' {
			balance++
		} else {
			balance--
		}
		if balance == 0 {
			pieces++
		}
	}
	return pieces
}
