// Suffix DP over run states plus a greedy walk. A[i][c] is the cheapest
// completion of the remaining positions given a closed run (length >= 3)
// of character c; a fresh run planted at i consumes i, i+1, i+2 and
// re-enters the closed state at i+3, so switching away from c costs the
// best "triple(i, ch) + A[i+3][ch]" over ch != c — kept as a top-2 pair
// so excluding c itself stays O(1). The walk takes the smallest character
// whose branch keeps the remaining budget achievable.
func minCostGoodCaption(caption string) string {
	n := len(caption)
	if n < 3 {
		return ""
	}
	const INF = 1 << 30
	src := make([]int, n)
	for i := 0; i < n; i++ {
		src[i] = int(caption[i] - 'a')
	}
	A := make([]int, 26*(n+4))
	for i := range A {
		A[i] = INF
	}
	for c := 0; c < 26; c++ {
		A[26*n+c] = 0
	}
	m1 := make([]int, n)
	m2 := make([]int, n)
	j1 := make([]int, n)
	j2 := make([]int, n)
	for i := range m1 {
		m1[i], m2[i], j1[i], j2[i] = INF, INF, -1, -1
	}
	abs := func(x int) int {
		if x < 0 {
			return -x
		}
		return x
	}
	for i := n - 1; i >= 0; i-- {
		si := src[i]
		rowNext := 26 * (i + 1)
		best1, best2, idx1, idx2 := INF, INF, -1, -1
		if i+3 <= n {
			s1 := src[i+1]
			s2 := src[i+2]
			rowTriple := 26 * (i + 3)
			for ch := 0; ch < 26; ch++ {
				v := abs(si-ch) + abs(s1-ch) + abs(s2-ch) + A[rowTriple+ch]
				if v < best1 {
					best2, idx2 = best1, idx1
					best1, idx1 = v, ch
				} else if v < best2 {
					best2, idx2 = v, ch
				}
			}
			m1[i], j1[i], m2[i], j2[i] = best1, idx1, best2, idx2
		}
		row := 26 * i
		for c := 0; c < 26; c++ {
			extend := abs(si-c) + A[rowNext+c]
			switchAway := INF
			if idx1 >= 0 {
				if idx1 != c {
					switchAway = best1
				} else {
					switchAway = best2
				}
			}
			if extend < switchAway {
				A[row+c] = extend
			} else {
				A[row+c] = switchAway
			}
		}
	}
	budget := m1[0]
	out := make([]byte, 0, n)
	r, c := 0, -1 // trailing run length; 0 only before the first character
	for i := 0; i < n; i++ {
		si := src[i]
		var chosen, cand int
		if r == 1 {
			// a length-1 run must still reach length 3: needs i, i+1
			if i+2 <= n {
				cand = abs(si-c) + abs(src[i+1]-c) + A[26*(i+2)+c]
			} else {
				cand = INF
			}
			chosen = c
		} else if r == 2 {
			cand = abs(si-c) + A[26*(i+1)+c]
			chosen = c
		} else {
			// free choice: extend the closed run, or plant a fresh one
			ext := INF
			if r == 3 {
				ext = abs(si-c) + A[26*(i+1)+c]
			}
			pick, pickVal := 27, INF
			if m1[i] == budget && j1[i] != c {
				pick, pickVal = j1[i], m1[i]
			} else if m2[i] == budget && j2[i] != c {
				pick, pickVal = j2[i], m2[i]
			}
			if ext == budget && c < pick {
				pick, pickVal = c, ext
			}
			chosen, cand = pick, pickVal
		}
		// unreachable: every reachable state keeps a branch on budget
		if cand != budget {
			return ""
		}
		out = append(out, byte(97+chosen))
		budget -= abs(si - chosen)
		if r == 0 || (r == 3 && chosen != c) {
			r, c = 1, chosen
		} else if r < 3 {
			r++
		}
	}
	return string(out)
}
