func minOperations(s string) int {
	// A proper substring cannot sort a length-two string, so a
	// descending pair is impossible; otherwise the answer is decided
	// by where the smallest and largest characters appear.
	n := len(s)
	sorted := true
	for i := 0; i+1 < n; i++ {
		if s[i] > s[i+1] {
			sorted = false
			break
		}
	}
	if sorted {
		return 0
	}
	if n == 2 {
		return -1
	}
	mn := s[0]
	mx := s[0]
	for i := 1; i < n; i++ {
		if s[i] < mn {
			mn = s[i]
		}
		if s[i] > mx {
			mx = s[i]
		}
	}
	if s[0] == mn || s[n-1] == mx {
		return 1
	}
	for i := 1; i+1 < n; i++ {
		if s[i] == mn || s[i] == mx {
			return 2
		}
	}
	return 3
}
