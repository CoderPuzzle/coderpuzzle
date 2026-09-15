// Greedy replay of the procedure: grow the current segment one character
// at a time and emit it the first moment it is not in the seen set, then
// start a new segment at the next index. A tail that reaches the end of s
// while still seen is never emitted — the loop simply ends (Example 2's
// final "a" is dropped).
func partitionString(s string) []string {
	segments := []string{}
	seen := make(map[string]struct{})
	start := 0
	for stop := 1; stop <= len(s); stop++ {
		candidate := s[start:stop]
		if _, duplicate := seen[candidate]; !duplicate {
			seen[candidate] = struct{}{}
			segments = append(segments, candidate)
			start = stop
		}
	}
	return segments
}
