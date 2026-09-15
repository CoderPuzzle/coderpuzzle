// Removing words[i] keeps every adjacent pair except (i-1, i) and
// (i, i+1), and adds the single new pair (i-1, i+1). With
// adj[j] = lcp(words[j], words[j+1]), the best surviving old pair is the
// max of adj[0..i-2] and adj[i+1..n-2] — pre/suffix maxima answer that
// in O(1) — so each answer is the max of the left max, the right max,
// and that one new LCP.
func longestCommonPrefix(words []string) []int {
	n := len(words)
	lcp := func(a, b string) int {
		limit := len(a)
		if len(b) < limit {
			limit = len(b)
		}
		j := 0
		for j < limit && a[j] == b[j] {
			j++
		}
		return j
	}
	adj := make([]int, max(n-1, 0))
	for i := 0; i+1 < n; i++ {
		adj[i] = lcp(words[i], words[i+1])
	}

	pre := make([]int, n) // max(adj[0..i-2]) — best pair fully left of i
	for i := 2; i < n; i++ {
		pre[i] = max(pre[i-1], adj[i-2])
	}
	suf := make([]int, n) // max(adj[i+1..n-2]) — best pair fully right of i
	for i := n - 3; i >= 0; i-- {
		suf[i] = max(suf[i+1], adj[i+1])
	}

	answer := make([]int, n)
	for i := 0; i < n; i++ {
		best := max(pre[i], suf[i])
		if i > 0 && i < n-1 {
			best = max(best, lcp(words[i-1], words[i+1]))
		}
		answer[i] = best
	}
	return answer
}
