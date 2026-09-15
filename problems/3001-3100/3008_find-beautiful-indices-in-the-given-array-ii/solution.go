func beautifulIndices(s string, a string, b string, k int) []int {
	occurrences := func(pattern, text string) []int {
		m := len(pattern)
		// KMP failure function: pi[i] is the length of the longest proper
		// prefix of pattern[:i+1] that is also its suffix.
		pi := make([]int, m)
		matched := 0
		for i := 1; i < m; i++ {
			for matched > 0 && pattern[i] != pattern[matched] {
				matched = pi[matched-1]
			}
			if pattern[i] == pattern[matched] {
				matched++
			}
			pi[i] = matched
		}
		// One scan of text; on a full match the failure function keeps the
		// scan going instead of restarting, so periodic texts stay linear.
		starts := []int{}
		matched = 0
		for i := 0; i < len(text); i++ {
			for matched > 0 && text[i] != pattern[matched] {
				matched = pi[matched-1]
			}
			if text[i] == pattern[matched] {
				matched++
			}
			if matched == m {
				starts = append(starts, i-m+1)
				matched = pi[matched-1]
			}
		}
		return starts
	}
	inA := occurrences(a, s)
	inB := occurrences(b, s)
	result := []int{}
	// Both lists ascend and i-k grows along inA, so the first b-occurrence
	// at or after i-k only moves forward: one merge-style pass tests each
	// window [i-k, i+k] in amortized constant time.
	low := 0
	for _, i := range inA {
		for low < len(inB) && inB[low] < i-k {
			low++
		}
		if low < len(inB) && inB[low] <= i+k {
			result = append(result, i)
		}
	}
	return result
}
