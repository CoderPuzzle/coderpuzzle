// last[j] anchors where word2[j:] is still exactly embeddable: one
// right-to-left sweep matches the tail of word2 against word1 and records,
// per slot, the index that consumed its character. The forward walk then
// takes every exact match immediately and spends the single allowed change
// only when the guard proves the rest of word2 still fits exactly after it
// (last slot, or i before last[j+1]); a change already spent forbids further
// mismatches.
func validSequence(word1 string, word2 string) []int {
	m := len(word2)
	ans := make([]int, m)
	last := make([]int, m)
	for j := range last {
		last[j] = -1
	}
	i, j := len(word1)-1, m-1
	for i >= 0 && j >= 0 {
		if word1[i] == word2[j] {
			last[j] = i
			j--
		}
		i--
	}
	canChange := true
	j = 0
	for i := 0; i < len(word1); i++ {
		if j == m {
			break
		}
		if word1[i] == word2[j] {
			ans[j] = i
			j++
		} else if canChange && (j == m-1 || i < last[j+1]) {
			canChange = false
			ans[j] = i
			j++
		}
	}
	if j != m {
		return []int{}
	}
	return ans
}
