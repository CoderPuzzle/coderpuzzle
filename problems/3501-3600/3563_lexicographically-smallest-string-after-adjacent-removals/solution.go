func lexicographicallySmallestString(s string) string {
	n := len(s)
	if n <= 1 {
		return s
	}

	consec := func(a, b byte) bool {
		d := int(a) - int(b)
		if d < 0 {
			d = -d
		}
		return d == 1 || d == 25 // 'a'-'z' are consecutive (circular)
	}

	// rem[i][j] = can s[i..j] be removed entirely
	rem := make([][]bool, n)
	for i := range rem {
		rem[i] = make([]bool, n)
	}
	for length := 2; length <= n; length++ {
		for i := 0; i+length <= n; i++ {
			j := i + length - 1
			for k := i; k < j; k++ {
				if rem[i][k] && rem[k+1][j] {
					rem[i][j] = true
					break
				}
			}
			if !rem[i][j] && consec(s[i], s[j]) {
				if length == 2 || rem[i+1][j-1] {
					rem[i][j] = true
				}
			}
		}
	}

	ans := make([]string, n+1)
	ans[n] = ""
	for i := n - 1; i >= 0; i-- {
		best := ""
		have := false
		for j := i; j <= n; j++ {
			if j > i && !rem[i][j-1] {
				continue
			}
			cand := ""
			if j < n {
				cand = string(s[j]) + ans[j+1]
			}
			if !have || cand < best {
				best = cand
				have = true
			}
		}
		ans[i] = best
	}
	return ans[0]
}
