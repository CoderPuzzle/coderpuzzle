func canChange(start string, target string) bool {
	type piece struct {
		i int
		c byte
	}
	var s, t []piece
	// pieces cannot pass through each other, so their relative order is
	// invariant: the k-th non-blank of start must match the k-th of target
	for i := 0; i < len(start); i++ {
		if start[i] != '_' {
			s = append(s, piece{i, start[i]})
		}
	}
	for i := 0; i < len(target); i++ {
		if target[i] != '_' {
			t = append(t, piece{i, target[i]})
		}
	}
	// unequal piece counts can never be matched one-to-one
	if len(s) != len(t) {
		return false
	}
	for p := range s {
		i, ci := s[p].i, s[p].c
		j, cj := t[p].i, t[p].c
		// equal counts but a different L/R sequence cannot align
		if ci != cj {
			return false
		}
		// L slides only left: it must not need to move right (i >= j);
		// R slides only right: i <= j — and these checks are also
		// sufficient, so no moves ever need simulating
		if ci == 'L' && i < j {
			return false
		}
		if ci == 'R' && i > j {
			return false
		}
	}
	return true
}
