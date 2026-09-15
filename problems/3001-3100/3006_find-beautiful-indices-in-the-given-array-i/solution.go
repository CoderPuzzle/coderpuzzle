import "sort"

func beautifulIndices(s string, a string, b string, k int) []int {
	// An index is beautiful exactly when it is an occurrence of a whose
	// window [i - k, i + k] contains an occurrence of b. Collect both
	// occurrence lists once — each scan advances one character at a time so
	// overlapping occurrences are not skipped — then for each a-occurrence
	// binary-search the sorted b-list for the leftmost entry >= i - k; it
	// qualifies iff that entry also satisfies <= i + k. Ascending
	// a-occurrences keep the answer ascending.
	occurrences := func(pattern string) []int {
		found := []int{}
		for start := 0; start+len(pattern) <= len(s); start++ {
			if s[start:start+len(pattern)] == pattern {
				found = append(found, start)
			}
		}
		return found
	}
	whereB := occurrences(b)
	answer := []int{}
	for _, i := range occurrences(a) {
		candidate := sort.SearchInts(whereB, i-k)
		if candidate < len(whereB) && whereB[candidate] <= i+k {
			answer = append(answer, i)
		}
	}
	return answer
}
