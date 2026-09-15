// A window s[i:i+m] is almost equal to pattern iff its mismatches fit in one
// slot: with f = forward match length at i (prefix of pattern) and b =
// backward match length from the window's right end (suffix of pattern), the
// window matches exactly when f == m, and when f + b >= m - 1 the runs leave
// at most one character between them, which a single change absorbs. Both
// tables come from Z-functions: forward over pattern + sep + s; over the
// reversals, a prefix of the reversed pattern matching at offset n - 1 -
// (window end) is exactly a common suffix ending at that window end.
func minStartingIndex(s string, pattern string) int {
	n, m := len(s), len(pattern)
	values := make([]int, 0, m+1+n)
	for i := 0; i < m; i++ {
		values = append(values, int(pattern[i]))
	}
	values = append(values, -1)
	for i := 0; i < n; i++ {
		values = append(values, int(s[i]))
	}
	z := zFunction(values)
	rvalues := make([]int, 0, m+1+n)
	for i := m - 1; i >= 0; i-- {
		rvalues = append(rvalues, int(pattern[i]))
	}
	rvalues = append(rvalues, -1)
	for i := n - 1; i >= 0; i-- {
		rvalues = append(rvalues, int(s[i]))
	}
	r := zFunction(rvalues)
	for i := 0; i+m <= n; i++ {
		f := min(z[m+1+i], m)
		if b := min(r[m+1+n-i-m], m); f >= m || f+b >= m-1 {
			return i
		}
	}
	return -1
}

func zFunction(values []int) []int {
	m := len(values)
	z := make([]int, m)
	z[0] = m
	left, right := 0, 0
	for i := 1; i < m; i++ {
		if i < right {
			if v := z[i-left]; v < right-i {
				z[i] = v
			} else {
				z[i] = right - i
			}
		}
		for i+z[i] < m && values[z[i]] == values[i+z[i]] {
			z[i]++
		}
		if i+z[i] > right {
			left, right = i, i+z[i]
		}
	}
	return z
}
