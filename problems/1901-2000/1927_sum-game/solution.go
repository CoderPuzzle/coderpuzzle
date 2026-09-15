func sumGame(num string) bool {
	// Track f = 2*diff + 9*k where diff is (left sum - right sum) over
	// fixed digits and k = (#'?' left) - (#'?' right). Every fill changes
	// f by an odd offset in [-9, 9] regardless of side. Alice wins iff
	// f != 0: she pushes +9 each turn, Bob can cancel at most -9 per
	// reply, and Bob holds f at 0 by mirroring whenever it starts there.
	diff, k := 0, 0
	n := len(num)
	for i := 0; i < n; i++ {
		ch := num[i]
		if ch == '?' {
			if i < n/2 {
				k++
			} else {
				k--
			}
		} else {
			d := int(ch - '0')
			if i < n/2 {
				diff += d
			} else {
				diff -= d
			}
		}
	}
	return 2*diff+9*k != 0
}
