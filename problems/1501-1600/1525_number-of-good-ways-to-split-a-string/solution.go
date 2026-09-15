func numSplits(s string) int {
	n := len(s)

	// prefix[i]: number of distinct letters in s[0..i]
	prefix := make([]int, n)
	var seen [26]bool
	distinct := 0
	for i := 0; i < n; i++ {
		idx := s[i] - 'a'
		if !seen[idx] {
			seen[idx] = true
			distinct++
		}
		prefix[i] = distinct
	}

	// suffix[i]: number of distinct letters in s[i..n-1]
	suffix := make([]int, n)
	seen = [26]bool{}
	distinct = 0
	for i := n - 1; i >= 0; i-- {
		idx := s[i] - 'a'
		if !seen[idx] {
			seen[idx] = true
			distinct++
		}
		suffix[i] = distinct
	}

	count := 0
	for i := 0; i < n-1; i++ {
		if prefix[i] == suffix[i+1] {
			count++
		}
	}
	return count
}
