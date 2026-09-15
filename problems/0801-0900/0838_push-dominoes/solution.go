func pushDominoes(dominoes string) string {
	n := len(dominoes)
	// Skip simulation: accumulate signed force. Left to right, an
	// R plants a sentinel force n and an L kills it; the force
	// decays one per step and never drops below zero.
	forces := make([]int, n)
	f := 0
	for i := 0; i < n; i++ {
		switch dominoes[i] {
		case 'R':
			f = n
		case 'L':
			f = 0
		default:
			if f > 0 {
				f--
			}
		}
		forces[i] += f
	}
	// Mirror pass: L plants the force and R blocks it; subtracting
	// leaves the difference between the opposing pushes.
	f = 0
	for i := n - 1; i >= 0; i-- {
		switch dominoes[i] {
		case 'L':
			f = n
		case 'R':
			f = 0
		default:
			if f > 0 {
				f--
			}
		}
		forces[i] -= f
	}
	// Sign decides: positive falls right, negative left, and zero
	// means the pushes balance — or nothing reached it.
	res := make([]byte, n)
	for i := 0; i < n; i++ {
		if forces[i] > 0 {
			res[i] = 'R'
		} else if forces[i] < 0 {
			res[i] = 'L'
		} else {
			res[i] = '.'
		}
	}
	return string(res)
}
