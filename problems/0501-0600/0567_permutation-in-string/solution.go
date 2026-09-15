func checkInclusion(s1 string, s2 string) bool {
	m, n := len(s1), len(s2)
	// No window of length m can exist inside a shorter s2.
	if m > n {
		return false
	}
	var need, window [26]int
	for i := 0; i < m; i++ {
		need[s1[i]-'a']++
		window[s2[i]-'a']++
	}
	// Matching frequency vectors means the window is a permutation of s1.
	if need == window {
		return true
	}
	for i := m; i < n; i++ {
		// Slide one position: add the entering char, drop the leaving one.
		window[s2[i]-'a']++
		window[s2[i-m]-'a']--
		if need == window {
			return true
		}
	}
	return false
}
