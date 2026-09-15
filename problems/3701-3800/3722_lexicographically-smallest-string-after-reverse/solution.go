func lexSmallest(s string) string {
	// Reversing a single character changes nothing, so s itself is always
	// one of the reachable strings and seeds the minimum.
	n := len(s)
	best := s
	// Flip the first k characters: the reversed head lands in front of
	// whatever the operation left untouched.
	for k := 2; k <= n; k++ {
		letters := []byte(s)
		for i, j := 0, k-1; i < j; i, j = i+1, j-1 {
			letters[i], letters[j] = letters[j], letters[i]
		}
		if candidate := string(letters); candidate < best {
			best = candidate
		}
	}
	// Flip the last k characters: the untouched head keeps its order while
	// the reversed tail closes the string.
	for k := 2; k <= n; k++ {
		letters := []byte(s)
		for i, j := n-k, n-1; i < j; i, j = i+1, j-1 {
			letters[i], letters[j] = letters[j], letters[i]
		}
		if candidate := string(letters); candidate < best {
			best = candidate
		}
	}
	return best
}
