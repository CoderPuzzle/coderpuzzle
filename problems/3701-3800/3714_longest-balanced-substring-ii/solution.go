func longestBalanced(s string) int {
	n := len(s)
	// Any single character is balanced, so with n >= 1 the answer is at
	// least 1.
	best := 1

	// Case 1 — one distinct letter: balance is vacuous over a run, so track
	// the longest run of equal neighbors.
	run := 1
	for i := 1; i < n; i++ {
		if s[i] == s[i-1] {
			run++
		} else {
			run = 1
		}
		if run > best {
			best = run
		}
	}

	// Case 2 — two distinct letters x and y: walk the string ignoring the
	// third letter z, keeping the running difference of their counts. Two
	// positions sharing a difference enclose a stretch that balances the
	// pair. Each z restarts the scan (a window through it would carry a
	// third letter), so first-seen slots carry a version stamp that the
	// split bumps instead of clearing the arrays.
	for x := 0; x < 3; x++ {
		for y := x + 1; y < 3; y++ {
			z := 3 - x - y
			first := make([]int, 2*n+1)
			stamp := make([]int, 2*n+1)
			for i := range first {
				first[i] = -1
				stamp[i] = -1
			}
			stamp[n] = 0 // difference 0 precedes index 0
			version, d := 0, 0
			for i := 0; i < n; i++ {
				c := int(s[i] - 'a')
				if c == z {
					version++
					d = 0
					stamp[n] = version
					first[n] = i
				} else {
					if c == x {
						d++
					} else {
						d--
					}
					v := d + n
					if stamp[v] == version {
						if i-first[v] > best {
							best = i - first[v]
						}
					} else {
						stamp[v] = version
						first[v] = i
					}
				}
			}
		}
	}

	// Case 3 — all three letters: hash each prefix's signature
	// (count_b - count_a, count_c - count_a); equal signatures at two
	// prefixes mean the stretch between them changed all three counts by the
	// same amounts. The earliest index per signature maximizes length.
	sigs := make(map[int64]int)
	width := int64(2*n + 1)
	sigs[int64(n)*width+int64(n)] = -1
	var ca, cb, cc int
	for i := 0; i < n; i++ {
		switch s[i] {
		case 'a':
			ca++
		case 'b':
			cb++
		default:
			cc++
		}
		sig := (int64(cb-ca)+int64(n))*width + (int64(cc-ca) + int64(n))
		if j, ok := sigs[sig]; ok {
			if i-j > best {
				best = i - j
			}
		} else {
			sigs[sig] = i
		}
	}

	return best
}
