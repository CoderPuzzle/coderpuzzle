func maxScoreWords(words []string, letters []string, score []int) int {
	// 26-entry count of the letter pool
	var available [26]int
	for _, s := range letters {
		available[s[0]-'a']++
	}
	// precompute each word's letter-requirement vector and total score so the
	// recursion works on counts only (n <= 14 makes 2^n fine)
	n := len(words)
	needs := make([][26]int, n)
	values := make([]int, n)
	for i, w := range words {
		for k := 0; k < len(w); k++ {
			j := w[k] - 'a'
			needs[i][j]++
			values[i] += score[j]
		}
	}

	best := 0
	var dfs func(i int, remaining [26]int, total int)
	dfs = func(i int, remaining [26]int, total int) {
		// every node is already a complete valid selection (the rest can be
		// skipped), so compare best here rather than only at leaves
		if total > best {
			best = total
		}
		if i == n {
			return
		}
		// branch 1: always explore skipping word i
		dfs(i+1, remaining, total)
		// branch 2: take word i only when the pool covers it; an infeasible
		// word simply prunes that subtree
		need := needs[i]
		ok := true
		for j := 0; j < 26; j++ {
			if remaining[j] < need[j] {
				ok = false
				break
			}
		}
		if ok {
			next := remaining
			for j := 0; j < 26; j++ {
				next[j] -= need[j]
			}
			dfs(i+1, next, total+values[i])
		}
	}
	dfs(0, available, 0)
	return best
}
