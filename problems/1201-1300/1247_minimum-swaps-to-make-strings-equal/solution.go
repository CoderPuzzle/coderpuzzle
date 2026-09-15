func minimumSwap(s1 string, s2 string) int {
	// Each swap fixes two mismatches, so an odd total is impossible.
	xy, yx := 0, 0
	for i := 0; i < len(s1); i++ {
		a, b := s1[i], s2[i]
		switch {
		case a == 'x' && b == 'y':
			xy++
		case a == 'y' && b == 'x':
			yx++
		}
	}
	if (xy+yx)%2 == 1 {
		return -1
	}
	// Same-shape pairs cost 1 each; one leftover pair of each shape costs 2.
	swaps := xy/2 + yx/2
	if xy%2 == 1 {
		swaps += 2
	}
	return swaps
}
