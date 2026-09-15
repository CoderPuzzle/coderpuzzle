// A one-character window must span a whole maximal run: starting
// inside the run leaves the same character before it, ending inside
// leaves the same character after it. So the answer is "some maximal
// run has length exactly k".
func hasSpecialSubstring(s string, k int) bool {
	n := len(s)
	i := 0
	for i < n {
		j := i
		for j < n && s[j] == s[i] {
			j++
		}
		if j-i == k {
			return true
		}
		i = j
	}
	return false
}
