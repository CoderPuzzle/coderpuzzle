func canMakeSubsequence(s string, t string) bool {
	m, n := len(s), len(t)
	pref := make([]int, m+1)
	for i := range pref {
		pref[i] = n + 1
	}
	pref[0] = 0
	for i := 0; i < m; i++ {
		j := pref[i]
		for j < n && s[i] != t[j] {
			j++
		}
		if j < n {
			pref[i+1] = j + 1
		} else {
			pref[i+1] = n + 1
		}
	}
	if pref[m] <= n {
		return true
	}

	suf := make([]int, m+1)
	for i := range suf {
		suf[i] = -1
	}
	suf[m] = n
	for i := m - 1; i >= 0; i-- {
		j := suf[i+1] - 1
		for j >= 0 && s[i] != t[j] {
			j--
		}
		suf[i] = j
	}
	for i := 0; i < m; i++ {
		if pref[i] < suf[i+1] {
			return true
		}
	}
	return false
}
