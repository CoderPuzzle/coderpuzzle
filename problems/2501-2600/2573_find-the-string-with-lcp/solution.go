func findTheString(lcp [][]int) string {
	n := len(lcp)
	// A real matrix is symmetric; reject fakes up front so only the lower
	// triangle needs checking later.
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if lcp[i][j] != lcp[j][i] {
				return ""
			}
		}
	}
	// Positive entries weld indices into letter-equality classes:
	// word[i] == word[j] iff lcp[i][j] > 0. Flood-fill those classes.
	group := make([]int, n)
	for i := range group {
		group[i] = -1
	}
	groups := 0
	stack := []int{}
	for i := 0; i < n; i++ {
		if group[i] >= 0 {
			continue
		}
		group[i] = groups
		stack = append(stack, i)
		for len(stack) > 0 {
			u := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			for v := 0; v < n; v++ {
				if lcp[u][v] > 0 && group[v] < 0 {
					group[v] = groups
					stack = append(stack, v)
				}
			}
		}
		groups++
	}
	if groups > 26 {
		return ""
	}
	// Cross-class order is unconstrained, so the alphabetically smallest
	// candidate numbers the classes by first appearance.
	letters := make([]byte, groups)
	for i := range letters {
		letters[i] = '-'
	}
	nxt := byte('a')
	word := make([]byte, n)
	code := make([]int, n)
	for i := 0; i < n; i++ {
		g := group[i]
		if letters[g] == '-' {
			letters[g] = nxt
			nxt++
		}
		word[i] = letters[g]
		code[i] = int(word[i])
	}
	// Rebuild dp[i][j] = lcp(word[i:], word[j:]) bottom-up and require an
	// exact match on every stored entry; a fabricated matrix fails here
	// even when its positivity structure looked consistent.
	below := make([]int, n+1) // row i+1; trailing slot stays 0
	for i := n - 1; i >= 0; i-- {
		ci := code[i]
		cur := make([]int, n+1)
		target := lcp[i]
		for j := i; j >= 0; j-- {
			if code[j] == ci {
				cur[j] = below[j+1] + 1
			}
			if cur[j] != target[j] {
				return ""
			}
		}
		below = cur
	}
	return string(word)
}
