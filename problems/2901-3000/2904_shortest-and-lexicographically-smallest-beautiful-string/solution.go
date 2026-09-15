// For a fixed left end i, extending right until the window first holds
// exactly k ones yields the only shortest beautiful candidate that starts
// at i: any earlier cut has fewer ones, and any later cut with k ones is
// strictly longer.
func shortestBeautifulSubstring(s string, k int) string {
	best := ""
	n := len(s)
	for i := 0; i < n; i++ {
		ones := 0
		for j := i; j < n; j++ {
			if s[j] == '1' {
				ones++
			}
			if ones == k {
				candidate := s[i : j+1]
				if best == "" || len(candidate) < len(best) {
					best = candidate
				} else if len(candidate) == len(best) && candidate < best {
					best = candidate
				}
				break
			}
		}
	}
	return best
}
