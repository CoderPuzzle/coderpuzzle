func longestValidSubstring(word string, forbidden []string) int {
	miss := 1 << 30
	// Aho-Corasick automaton over the forbidden strings. Children live in
	// one map keyed node*32 + char, so memory tracks the trie's edge count
	// instead of any alphabet-wide table.
	children := make(map[int]int)
	maxLen := 0
	for _, s := range forbidden {
		if len(s) > maxLen {
			maxLen = len(s)
		}
	}
	levels := make([][]int, maxLen+1)
	fail := []int{0}
	best := []int{miss}
	parent := []int{0}
	pch := []int{0}
	for _, s := range forbidden {
		cur := 0
		for i := 0; i < len(s); i++ {
			c := int(s[i] - 'a')
			key := cur*32 + c
			nxt, ok := children[key]
			if !ok {
				nxt = len(fail)
				children[key] = nxt
				fail = append(fail, 0)
				best = append(best, miss)
				parent = append(parent, cur)
				pch = append(pch, c)
				levels[i+1] = append(levels[i+1], nxt)
			}
			cur = nxt
		}
		if len(s) < best[cur] {
			best[cur] = len(s)
		}
	}
	// Failure links, breadth-first over depth buckets: fail[u] is the
	// longest proper suffix of u's path that is also a trie path. Folding
	// best along each link tells every node the shortest forbidden string
	// ending there, with no occurrence enumeration at scan time.
	for depth := 1; depth <= maxLen; depth++ {
		for _, u := range levels[depth] {
			c := pch[u]
			f := fail[parent[u]]
			for f != 0 {
				if _, ok := children[f*32+c]; ok {
					break
				}
				f = fail[f]
			}
			v, ok := children[f*32+c]
			if !ok || v == u {
				fail[u] = 0
			} else {
				fail[u] = v
			}
			if best[fail[u]] < best[u] {
				best[u] = best[fail[u]]
			}
		}
	}
	n := len(word)
	left := 0
	ans := 0
	state := 0
	// Longest-match scan: the state is always the longest suffix of the
	// text that prefixes some forbidden string, so each character costs one
	// amortized-constant hop instead of the window variant's L probes.
	for right := 0; right < n; right++ {
		c := int(word[right] - 'a')
		for state != 0 {
			if _, ok := children[state*32+c]; ok {
				break
			}
			state = fail[state]
		}
		if v, ok := children[state*32+c]; ok {
			state = v
		} else {
			state = 0
		}
		// The shortest forbidden suffix ending at right starts latest --
		// exactly the match the window variant jumps at -- so hopping the
		// left end past its first character keeps the same sweep.
		if m := best[state]; m != miss {
			if j := right - m + 2; j > left {
				left = j
			}
		}
		if right-left+1 > ans {
			ans = right - left + 1
		}
	}
	return ans
}
