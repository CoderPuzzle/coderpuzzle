func shortestSequence(rolls []int, k int) int {
	// A "complete window" (all k faces seen since the last reset)
	// extends coverage to sequences one roll longer.
	seen := make(map[int]struct{})
	// answer = (#complete windows so far) + 1; starts at 1 because with
	// zero windows some face never rolled, so length 1 already fails.
	answer := 1
	for _, r := range rolls {
		seen[r] = struct{}{}
		if len(seen) == k {
			// Window complete: whatever prefix was matched inside it,
			// every next symbol is available after this point.
			answer++
			seen = make(map[int]struct{})
		}
	}
	// No complete set of faces remains, so a sequence of this length
	// cannot be matched as a subsequence.
	return answer
}
