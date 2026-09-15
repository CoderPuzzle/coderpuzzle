func isPossibleToRearrange(s string, t string, k int) bool {
	// The rearrangement exists exactly when the two chunk multisets
	// match: any order of t's chunks is reachable, and every piece of s
	// must be consumed whole. Hash-counting makes the comparison a
	// single O(n) pass over the two chunk sequences.
	size := len(s) / k
	counts := make(map[string]int, k)
	for i := 0; i < k; i++ {
		chunk := s[i*size : (i+1)*size]
		counts[chunk]++
	}
	for i := 0; i < k; i++ {
		chunk := t[i*size : (i+1)*size]
		if counts[chunk] == 0 {
			return false
		}
		counts[chunk]--
	}
	return true
}
