func maximumLength(nums []int) int {
	// Only parities matter: a valid subsequence either never changes
	// parity (all adjacent sums even) or flips parity on every step (all
	// adjacent sums odd). Those are exactly four target shapes -- all-
	// even, all-odd, alternating from even, alternating from odd. For
	// each shape sweep nums once keeping its next wanted parity and take
	// the earliest match, which never forgoes a later slot.
	best := 0
	for start := 0; start <= 1; start++ {
		for shape := 0; shape <= 1; shape++ {
			alternate := shape == 1
			want := start
			length := 0
			for _, value := range nums {
				if value%2 == want {
					length++
					if alternate {
						want ^= 1
					}
				}
			}
			if length > best {
				best = length
			}
		}
	}
	return best
}
