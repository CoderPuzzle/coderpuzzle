// A run is a maximal block of equal digits. A run of length L must split
// into 3-length pieces plus at most one 2-length piece, so L%3 is 0 (no 2)
// or 2 (one 2); L%3 == 1 can never be split.
func isDecomposable(s string) bool {
	twos := 0
	for i := 0; i < len(s); {
		j := i
		for j < len(s) && s[j] == s[i] {
			j++
		}
		length := j - i
		if length%3 == 1 {
			return false
		}
		if length%3 == 2 {
			twos++
			if twos > 1 {
				return false
			}
		}
		i = j
	}
	return twos == 1
}
