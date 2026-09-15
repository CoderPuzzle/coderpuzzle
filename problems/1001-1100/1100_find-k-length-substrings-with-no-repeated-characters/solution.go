func numKLenSubstrNoRepeats(s string, k int) int {
	// A window of length k is valid exactly when all k positions hold
	// different characters, i.e. distinct == k. Slide in place.
	n := len(s)
	if k > n || k > 26 {
		return 0
	}
	var freq [26]int
	distinct, ans := 0, 0
	for i := 0; i < n; i++ {
		right := s[i] - 'a'
		freq[right]++
		if freq[right] == 1 {
			distinct++
		}
		if i >= k {
			left := s[i-k] - 'a'
			freq[left]--
			if freq[left] == 0 {
				distinct--
			}
		}
		if distinct == k {
			ans++
		}
	}
	return ans
}
